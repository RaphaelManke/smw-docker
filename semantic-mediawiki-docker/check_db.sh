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
dir="$pwd"
#sleep 1
main
cd "$dir"
