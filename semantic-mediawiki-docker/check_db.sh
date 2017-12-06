#!/bin/bash
function main {
    echo "$@"
    BASE="/var/www/html/"
    cd "$BASE"
    INDICATOR_FILE="LocalSettings.php"
    if [ -f "$INDICATOR_FILE" ]; then
        echo "$INDICATOR_FILE exists. Database already initialized"
        php "maintenance/update.php"

    else
        echo "$INDICATOR_FILE file does not exist"
        php maintenance/install.php \
            --dbname=my_wiki \
            --dbserver="database" \
            --installdbuser=wikiuser \
            --installdbpass=example \
            --dbuser=wikiuser \
            --dbpass=example \
            --server="http://localhost:8080" \
            --scriptpath="" \
            --lang=en \
            --pass=smw-docker \
            "Example Semantic Media Wiki" \
            "Admin"
    fi

}

function install_smw {
    echo 'require_once "$IP/extensions/SemanticMediaWiki/SemanticMediaWiki.php";' >> LocalSettings.php
    echo "enableSemantics( 'example.org' );" >> LocalSettings.php
    php "maintenance/update.php"
    #php composer.phar require mediawiki/semantic-media-wiki "~2.5" --update-no-dev
}

function install_extensions {
    # TODO Pfad richtig weitergeben
    sh install_extensions.sh "$dir/install_extensions.json"
}


dir="${pwd}"
echo "try to ping Database"
echo $dir

UNREACHEABLE=1;
while [ $UNREACHEABLE -ne "0" ];
   #do ping -q -c 1 database &> /dev/null; UNREACHEABLE=$?; echo "try again"; sleep 1;
   do
    #main ;
    UNREACHEABLE=$?;
    echo "try again";
    sleep 1;
done
# TODO write script to install/add media_wiki
#install_smw
#  TODO write script for installing extensions
install_extensions

#main
echo $?
cd "$dir"
echo $pwd
