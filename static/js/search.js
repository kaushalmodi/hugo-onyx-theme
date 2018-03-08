// https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae

// how many characters to include on either side of match keyword
summaryInclude=60;
//options for fuse.js
var fuseOptions = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    includeMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
        "title",
        "contents",
        "tags"
    ]
};

var searchQuery = param("s");
if(searchQuery){
    $("#search-query").val(searchQuery);
    executeSearch(searchQuery);
}else {
    $('#search-results').append("<p>Please enter a word or phrase above</p>");
}

function executeSearch(searchQuery){
    // Assuming that this script is always called from baseURL/search/, it can
    // be safely assumed that baseURL/index.json exists. This works even when
    // the baseURL is something like https://example.com/v1/.
    $.getJSON( "../index.json", function( data ) {
        var pages = data;
        var fuse = new Fuse(pages, fuseOptions);
        var result = fuse.search(searchQuery);
        console.log({"matches":result});
        if(result.length > 0){
            populateResults(result);
        }else{
            $('#search-results').append("<p>No matches found</p>");
        }
    });
}

function populateResults(result){
    $.each(result,function(key,value){
        var contents= value.item.contents;
        var snippet = "";
        var snippetHighlights=[];
        var tags =[];
        $.each(value.matches,function(matchKey,mvalue){
            if(mvalue.key == "tags"){
                snippetHighlights.push(mvalue.value);
            }else if(mvalue.key == "contents"){
                start = mvalue.indices[0][0]-summaryInclude>0?mvalue.indices[0][0]-summaryInclude:0;
                end = mvalue.indices[0][1]+summaryInclude<contents.length?mvalue.indices[0][1]+summaryInclude:contents.length;
                snippet += contents.substring(start,end);
                snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0],mvalue.indices[0][1]-mvalue.indices[0][0]+1));
            }
        });
        if(snippet.length<1){
            snippet += contents.substring(0,summaryInclude*2);
        }
        //pull template from hugo templarte definition
        var templateDefinition = $('#search-result-template').html();
        //replace values
        var output = render(templateDefinition,{key:key,title:value.item.title,link:value.item.permalink,tags:value.item.tags,snippet:snippet});
        $('#search-results').append(output);

        $.each(snippetHighlights,function(snipkey,snipvalue){
            $("#summary-"+key).mark(snipvalue);
        });

    });
}

function param(name) {
    return (location.search.split(name + '=')[1] || '').split('&')[0];
}

function render(templateString, data) {
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    return templateString;
}
