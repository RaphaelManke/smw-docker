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


#
# install procedure, takes x arguments
# file -> config file e.g. extensions.json
# type -> the type of the extension e.g. skin,extension,...
# path -> path where the data is stored
#
function main {
    # assign input variable better names
    file=$1
    type=$2
    path=$3
    echo "TYPE = $type"
    # check which type for extracting right values.
    if [ "$type" == "extensions" ]
    then
        NAMES=($(jq -r '.extensions[].name' "$file"))
        URLS=($(jq -r '.extensions[].url' "$file"))
    elif [ "$type" == "skins" ]
    then
        NAMES=($(jq -r '.skins[].name' "$file"))
        URLS=($(jq -r '.skins[].url' "$file"))
    fi
    # define iter to access matching url for name
    ITER=0
    for i in "${NAMES[@]}"
    do
        localName="$i"
        localUrl="${URLS[$ITER]}"
        echo "$localName"
        echo "$ITER"
        echo "$localUrl"
        extPath="$path/$localName/"
        echo "$extPath"

        # extensions already exists.
        if [ -d "$extPath" ]
        then
            cd "$extPath"
            git pull
            if [ $? -eq 0 ]
            then
                echo "successfully updated $localName"
            else
                echo "Error pulling $localName"
            fi
        # extension not found, cloning it.
        else
            git clone "$localUrl" "$extPath"
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
            if [ "$type" == "extensions" ]
            then
                searchTerm="wfLoadExtension( '$localName' );"
            elif [ "$type" == "skins" ]
            then
                searchTerm="wfLoadSkin( '$localName' );"
            fi

        else
            echo "Adding old Syntax"
            searchTerm="require_once \"\$IP/$type/$localName/$localName.php\";"
        fi
        # check if extension is in localSettings file.
        add_to_file "$searchTerm" "$localSettings" "$localName"
        if [ "$type" == "skins" ]
            then
                echo "s/^\$wgDefaultSkin =.*/\$wgDefaultSkin = \"${localName,,}\";/g" "$workDir/$localSettings"
                sed -i "s/^\$wgDefaultSkin =.*/\$wgDefaultSkin = \"${localName,,}\";/g" "$workDir/$localSettings"
                cat "$workDir/$localSettings"
                ls "$extPath"
        fi
        ((ITER++))
    done

}

# Config
workDir=$(pwd)
jsonFile=$1
extensionPath="extensions"
skinPath="skins"
localSettings="LocalSettings.php"

main "$jsonFile" "extensions" "$extensionPath"

#main "$jsonFile" "skins" "$skinPath"
