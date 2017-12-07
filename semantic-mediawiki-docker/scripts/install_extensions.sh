#!/bin/bash

# needs 3 Arguments
# $1 -> search term
# $2 -> file to search
# $3 -> readable name what is searched for (for logging)

function add_to_file {
    searchTerm=$1
    file=$2
    searchName=$3

    if grep -Rq "$searchTerm" "$file"
    then
        echo "$searchName already in $file file. Nothing to do."
        # code if found
    else
        if [ -e "$file" ]
        then
            echo "$searchTerm" >> "$file"
            echo "added $searchName extension to $file file."
        else
            echo "Error $file does not exists. Can not add Extension"
        fi
        # code if not found
    fi
}

#
# helper function to check version numbers
#
function version_gt() { test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"; }


function main {
    extensions=`cat $1`
    #echo "$extensions"
    NAME=($(jq -r '.extensions[].name' "$1"))
    echo "$NAME"
    #while read NAME
    for i in "${NAME[@]}"
    do
        localName="$i"
        echo "$localName"
        extPath="$basePath/$localName/"

        # extensions already exists.
        if [ -d "$extPath" ]
        then
            cd "$extPath"
            echo $(pwd)
            git pull
            if [ $? -eq 0 ]
            then
                echo "successfully updated $localName"
            else
                echo "Error pulling $localName"
            fi
        # extension not found, cloning it.
        else
            git clone "https://gerrit.wikimedia.org/r/p/mediawiki/extensions/$localName.git" $basePath/$localName
            if [ $? -eq 0 ]
            then
                echo "successfully cloned $localName"
            else
                echo "Error cloning $localName"
            fi

        fi
        # go back to working directory
        cd "$workDir"

        # see https://www.mediawiki.org/wiki/Manual:Extensions
        if version_gt "$MEDIAWIKI_MAJOR_VERSION" "1.24"
        then
            echo "Adding new Syntax"
            searchTerm="wfLoadExtension( '$localName' );"
        else
            echo "Adding old Syntax"
            searchTerm="require_once \"\$IP/extensions/$localName/$localName.php\";"
        fi
        # check if extension is in localSettings file.
        add_to_file "$searchTerm" "$localSettings" "$localName"


    done

}

# Config
workDir=$(pwd)
basePath="extensions"
localSettings="LocalSettings.php"

main $1
