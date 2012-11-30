dojo.provide("js.config");
dojo.declare("js.config", null, {

    // This file contains various configuration settings for "Executive Dashboard" template
    // 
    // Use this file to perform the following:
    //
    // 1.  Specify application title                  - [ Tag(s) to look for: ApplicationName ]   
    // 2.  Set welcome screen message                 - [ Tag(s) to look for: WelcomeScreenMessage ]
    // 3.  Set URL for help page                      - [ Tag(s) to look for: HelpURL ]
    //
    // 4.  Specify URLs for basemaps                  - [ Tag(s) to look for: BaseMapLayers ]   
    //  
    // 5.  Specify Authenticated links                - [ Tag(s) to look for: AuthenticatedLinks ] 
    //  
    // 6.  Specify Authenticated group                - [ Tag(s) to look for: AuthenticatedGroup ]   
    //
    // 7.  Specify Bookmark Header                    - [ Tag(s) to look for: BookmarkHeader ] 
    //
    // 8.  Specify state of retaining                 - [ Tag(s) to look for: RetainState ] 
    //  
    // 9. Customize data formatting                   - [ Tag(s) to look for: ShowNullValueAs, FormatDateAs ]
    //
    // 10. Customize address search settings          - [ Tag(s) to look for: LocatorSettings ]                                                  
    //    
    // 11. Set Fields for RSS                         - [ Tag(s) to look for: RSSFields ]
    // 
    // 12. Set Fields for Trends                      - [ Tag(s) to look for: TwitterDetails ]
    // 
    // 13. Specify images for welcome screen          - [ Tag(s) to look for: WelcomeScreenImages ]
    // 
    // 14. Specify images for subject groups           - [ Tag(s) to look for: LayerImages ]
    //    
    // 15. Set Fields for Metric pods                 - [ Tag(s) to look for: InfoPodStatics ]
    // 
    // 16. Set Fields for Metric pods information     - [ Tag(s) to look for: PodInformation ]  
    // 
    // 17. Set keyword to detect statistics layer     - [ Tag(s) to look for: StatisticsKeyword ]  
    // 
    // 18. Specify URLs for map sharing               - [ Tag(s) to look for:  ShareByMailLink ]
    // 19.In case of changing the TinyURL service
    //     Specify URL for the new service            - [ Tag(s) to look for: MapSharingOptions (set TinyURLServiceURL, TinyURLResponseAttribute) ]
    //
    //

    // ------------------------------------------------------------------------------------------------------------------------
    // GENERAL SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    //Set application title.
    ApplicationName: "Executive Dashboard",

    //Message that appears when the application starts.
    WelcomeScreenMessage: "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nam liber te conscient to factor tum poen legum odioque civiuda.",

    //Set URL of help page/portal.
    HelpURL: "help.htm",

    //Set baseMap layer value.
    BaseMapLayer:
          [
          {
              MapValue: "Basemap"
          }
          ],

    //Authenticated links to generate tokens with the credentials.
    AuthenticatedLinks: "http://www.arcgis.com/sharing/rest/content/groups/${0}?f=json&token=${0}",

    //Authenticated group id for dashboard group.
    AuthenticatedGroup: "55b4ec3619fe4363be3d3de2639302b0",

    //Title for bookmarks header
    BookmarkHeader: "Bookmarks",

    //Flag for retaining the state of containers.(Bookmark,Address)
    RetainState: true,

    //Title for the graph container tab.
    GraphTabName: "Trend",

    //Set date format
    FormatDateAs: "MMM dd, yyyy",

    //Set string value to be shown for null or blank values.
    ShowNullValueAs: "N/A",

    //Set locator settings
    LocatorSettings: {
        DefaultLocatorSymbol: "images/Pushpin.png",
        MarkupSymbolSize: { width: 35, height: 35 },
        DefaultValue: "1848 N Mill St Naperville IL 60563",
        LocatorParamaters: ["SingleLine"],
        LocatorURL: "http://tasks.arcgisonline.com/ArcGIS/rest/services/Locators/TA_Address_NA_10/GeocodeServer",
        CandidateFields: "Loc_name, Score, Match_addr",
        DisplayField: "${Match_addr}",
        ZoomLevel: 14,
        AddressMatchScore: 80,
        LocatorFieldName: 'Loc_name',
        LocatorFieldValues: ["US_RoofTop", "US_StreetName"]
    },

    //Fields for RSS Feed.
    RSSFields: ["item", "title", "link", "description"],

    //Link and fields for twitter trend.
    TwitterDetails: [
    { TwitterURL: "http://search.twitter.com/search.rss" },
    { Fields: ["item", "author", "link", "description"] }
    ],

    //Default values to set the RSS Feed and Twitter trend.
    DefaultNewsFields: [
    { RSSFeedName: "Naperville", RSSFeedURL: "http://www.naperville.il.us/News_rss.aspx" },
    { TwitterTrendName: "ESRI" }
    ],

    //Set headers and Images for the welcome screen.
    WelcomeScreenImages: [
    { Name: "Transportation", Image: "images/b1.png" },
    { Name: "Education", Image: "images/b2.png" },
    { Name: "City Services", Image: "images/b3.png" }
    ],

    //Layer Images for the subject groups.
    LayerImages: [
        { Tag: "Public Safety", Images: ["images/safety.png", "images/safety_hover.png"], isPodVisible: true },
        { Tag: "City Services", Images: ["images/city.png", "images/city_hover.png"], isPodVisible: true },
        { Tag: "Transportation", Images: ["images/transport.png", "images/transport_hover.png"], isPodVisible: true },
        { Tag: "Capital Projects", Images: ["images/capital.png", "images/capital_hover.png"], isPodVisible: true },
        { Tag: "Special Events", Images: ["images/special_events.png", "images/special_events_hover.png"], isPodVisible: true },
        { Tag: "Water", Images: ["images/water.png", "images/water_hover.png"], isPodVisible: true }
        ],

    //Specify fields for the Metric pods.
    InfoPodStatics: [
    { CurrentObservation: "${OBSERVCURR}", LatestObservation: "${OBSERV1}", PreviousObservations: ["${OBSERV2}", "${OBSERV3}", "${OBSERV4}"], StaticsPosition: "${INCREASEPOS}" },
    { DateObservations: ["${DATECURR}", "${DATE1}", "${DATE2}", "${DATE3}", "${DATE4}"], DatePattern: "MMM-dd" }
    ],

    //Update information for info pods.
    PodInformation: "Last update on: <br><br> ${LASTUPDATE}",

    //Keyword to detect the statistics layer.
    StatisticsKeyword: "Stats",

    // ------------------------------------------------------------------------------------------------------------------------
    // SETTINGS FOR MAP SHARING
    // ------------------------------------------------------------------------------------------------------------------------
    // Set URL for TinyURL service, and URLs for Email.
    MapSharingOptions:
          {
              TinyURLServiceURL: "http://api.bit.ly/v3/shorten?login=esri&apiKey=R_65fd9891cd882e2a96b99d4bda1be00e&uri=${0}&format=json",
              TinyURLResponseAttribute: "data.url",
              ShareByMailLink: "mailto:%20?subject=Note%20from%20my%20Executive%20Dashboard&body=${0}"
          }

});
