FROM mediawiki
#RUN git clone https://gerrit.wikimedia.org/r/mediawiki/extensions/VisualEditor
#WORKDIR ./VisualEditor
#COPY
RUN apt-get update && apt-get install -y \
		nano \
		wget \
		jq \
		unzip
RUN wget "https://github.com/SemanticMediaWiki/SemanticMediaWiki/releases/download/2.5.5/Semantic_MediaWiki_2.5.5_and_dependencies.zip" && \
    unzip "Semantic_MediaWiki_2.5.5_and_dependencies.zip" -d extensions/
CMD /var/www/html/check_db.sh && apache2-foreground