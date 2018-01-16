FROM local/mediawiki:30
#RUN git clone https://gerrit.wikimedia.org/r/mediawiki/extensions/VisualEditor
#WORKDIR ./VisualEditor
#COPY
RUN apt-get update && apt-get install -y \
		nano \
		wget \
		jq \
		unzip \
		libpng-dev

# install needed php extension
#RUN php --ini

RUN docker-php-ext-install gd
# Copy composer install script
COPY ./install_composer.sh ./
# Run the composer installation
RUN sh "install_composer.sh"
RUN php --ini
RUN php composer.phar require mediawiki/semantic-media-wiki "~2.5" --update-no-dev
#RUN wget "https://github.com/SemanticMediaWiki/SemanticMediaWiki/releases/download/2.5.5/Semantic_MediaWiki_2.5.5_and_dependencies.zip" && \
#    unzip "Semantic_MediaWiki_2.5.5_and_dependencies.zip" -d extensions/
CMD /var/www/html/check_db.sh && apache2-foreground
#CMD apache2-foreground