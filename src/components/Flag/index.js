const country = [
  { src: require("../../flag/afghanistan.png"), country: "Afghanistan" },
  { src: require("../../flag/albania.png"), country: "Albania" },
  { src: require("../../flag/algeria.png"), country: "Algeria" },
  { src: require("../../flag/american-samoa.png"), country: "American Samoa" },
  { src: require("../../flag/andorra.png"), country: "Andorra" },
  { src: require("../../flag/angola.png"), country: "Angola" },
  { src: require("../../flag/anguilla.png"), country: "Anguilla" },
  {
    src: require("../../flag/antigua-and-barbuda.png"),
    country: "Antigua and Barbuda",
  },
  { src: require("../../flag/argentina.png"), country: "Argentina" },
  { src: require("../../flag/armenia.png"), country: "Armenia" },
  { src: require("../../flag/aruba.png"), country: "Aruba" },
  { src: require("../../flag/australia.png"), country: "Australia" },
  { src: require("../../flag/austria.png"), country: "Austria" },
  { src: require("../../flag/azerbaijan.png"), country: "Azerbaijan" },
  { src: require("../../flag/bahamas-3.png"), country: "Bahamas" },
  { src: require("../../flag/bahrain.png"), country: "Bahrain" },
  { src: require("../../flag/barbados.png"), country: "Barbados" },
  { src: require("../../flag/belarus.png"), country: "Belarus" },
  { src: require("../../flag/belgium-3.png"), country: "Belgium" },
  { src: require("../../flag/belize.png"), country: "Belize" },
  { src: require("../../flag/benin.png"), country: "Benin" },
  { src: require("../../flag/bermuda.png"), country: "Bermuda" },
  { src: require("../../flag/bhutan.png"), country: "Bhutan" },
  { src: require("../../flag/bngladesh.png"), country: "Bangladesh" },
  { src: require("../../flag/bolivia.png"), country: "Bolivia" },
  { src: require("../../flag/bosnia.png"), country: "Bosnia" },
  { src: require("../../flag/botswana.png"), country: "Botswana" },
  { src: require("../../flag/brazil.png"), country: "Brazil" },
  {
    src: require("../../flag/british-virgin-islands.png"),
    country: "British Virgin Islands",
  },
  { src: require("../../flag/brunei.png"), country: "Brunei" },
  { src: require("../../flag/bulgaria.png"), country: "Bulgaria" },
  { src: require("../../flag/burkina-faso.png"), country: "Burkina Faso" },
  { src: require("../../flag/burundi.png"), country: "Burundi" },
  { src: require("../../flag/cambodia.png"), country: "Cambodia" },
  { src: require("../../flag/cameroon.png"), country: "Cameroon" },
  { src: require("../../flag/canada.png"), country: "Canada" },
  { src: require("../../flag/cape-verde.png"), country: "Cape Verde" },
  { src: require("../../flag/cayman-islands.png"), country: "Cayman Islands" },
  {
    src: require("../../flag/central-african-republic.png"),
    country: "Central African Republic",
  },
  { src: require("../../flag/chad.png"), country: "Chad" },
  { src: require("../../flag/chech-republic.png"), country: "Czech Republic" },
  { src: require("../../flag/chile.png"), country: "Chile" },
  { src: require("../../flag/china.png"), country: "China" },
  { src: require("../../flag/colombia.png"), country: "Colombia" },
  { src: require("../../flag/comoros.png"), country: "Comoros" },
  {
    src: require("../../flag/congo-democratic.png"),
    country: "Congo Democratic",
  },
  { src: require("../../flag/congo-republic.png"), country: "Congo Republic" },
  { src: require("../../flag/cook-islands.png"), country: "Cook Islands" },
  { src: require("../../flag/costa-rica.png"), country: "Costa Rica" },
  { src: require("../../flag/croatia.png"), country: "Croatia" },
  { src: require("../../flag/cuba.png"), country: "Cuba" },
  { src: require("../../flag/curacao.png"), country: "Curacao" },
  { src: require("../../flag/cyprus.png"), country: "Cyprus" },
  { src: require("../../flag/denmark.png"), country: "Denmark" },
  { src: require("../../flag/djibouti.png"), country: "Djibouti" },
  { src: require("../../flag/dominica.png"), country: "Dominica" },
  {
    src: require("../../flag/dominican-republic.png"),
    country: "Dominican Republic",
  },
  { src: require("../../flag/ecuador.png"), country: "Ecuador" },
  { src: require("../../flag/egypt.png"), country: "Egypt" },
  { src: require("../../flag/el-salvador.png"), country: "El Salvador" },
  { src: require("../../flag/england.png"), country: "England" },
  {
    src: require("../../flag/equatorial-guinea.png"),
    country: "Equatorial Guinea",
  },
  { src: require("../../flag/eritrea.png"), country: "Eritrea" },
  { src: require("../../flag/estonia-2.png"), country: "Estonia" },
  { src: require("../../flag/ethiopia.png"), country: "Ethiopia" },
  { src: require("../../flag/faroe-islands.png"), country: "Faroe Islands" },
  { src: require("../../flag/fiji.png"), country: "Fiji" },
  { src: require("../../flag/finland.png"), country: "Finland" },
  { src: require("../../flag/france-3.png"), country: "France" },
  { src: require("../../flag/gabon.png"), country: "Gabon" },
  { src: require("../../flag/gambia.png"), country: "Gambia" },
  { src: require("../../flag/georgia.png"), country: "Georgia" },
  { src: require("../../flag/germany.png"), country: "Germany" },
  { src: require("../../flag/ghana.png"), country: "Ghana" },
  { src: require("../../flag/gibraltar.png"), country: "Gibraltar" },
  { src: require("../../flag/greece.png"), country: "Greece" },
  { src: require("../../flag/grenada.png"), country: "Grenada" },
  { src: require("../../flag/guam.png"), country: "Guam" },
  { src: require("../../flag/guatemala.png"), country: "Guatemala" },
  { src: require("../../flag/guinea.png"), country: "Guinea" },
  { src: require("../../flag/guyana.png"), country: "Guyana" },
  { src: require("../../flag/haiti.png"), country: "Haiti" },
  { src: require("../../flag/honduras.png"), country: "Honduras" },
  { src: require("../../flag/hong-kong.png"), country: "Hong Kong" },
  { src: require("../../flag/hungary-3.png"), country: "Hungary" },
  { src: require("../../flag/iceland.png"), country: "Iceland" },
  { src: require("../../flag/india.png"), country: "India" },
  { src: require("../../flag/indonesia.png"), country: "Indonesia" },
  { src: require("../../flag/iran.png"), country: "Iran" },
  { src: require("../../flag/iraq.png"), country: "Iraq" },
  { src: require("../../flag/ireland.png"), country: "Ireland" },
  { src: require("../../flag/israel.png"), country: "Israel" },
  { src: require("../../flag/italy.png"), country: "Italy" },
  { src: require("../../flag/jamaica.png"), country: "Jamaica" },
  { src: require("../../flag/japan.png"), country: "Japan" },
  { src: require("../../flag/jordan-2.png"), country: "Jordan" },
  { src: require("../../flag/kazakhstan.png"), country: "Kazakhstan" },
  { src: require("../../flag/kenya.png"), country: "Kenya" },
  { src: require("../../flag/kiribati.png"), country: "Kiribati" },
  { src: require("../../flag/kosovo.png"), country: "Kosovo" },
  { src: require("../../flag/kuwait.png"), country: "Kuwait" },
  { src: require("../../flag/kyrgystan.png"), country: "Kyrgyzstan" },
  { src: require("../../flag/laos.png"), country: "Laos" },
  { src: require("../../flag/latvia.png"), country: "Latvia" },
  { src: require("../../flag/lebanon.png"), country: "Lebanon" },
  { src: require("../../flag/lesotho.png"), country: "Lesotho" },
  { src: require("../../flag/liberia.png"), country: "Liberia" },
  { src: require("../../flag/libya.png"), country: "Libya" },
  { src: require("../../flag/liechtenstein.png"), country: "Liechtenstein" },
  { src: require("../../flag/lithuania.png"), country: "Lithuania" },
  { src: require("../../flag/luxembourg.png"), country: "Luxembourg" },
  { src: require("../../flag/macau.png"), country: "Macau" },
  { src: require("../../flag/macedonia.png"), country: "Macedonia" },
  { src: require("../../flag/madagascar.png"), country: "Madagascar" },
  { src: require("../../flag/malaysia.png"), country: "Malaysia" },
  { src: require("../../flag/maldives.png"), country: "Maldives" },
  { src: require("../../flag/mali-3.png"), country: "Mali" },
  { src: require("../../flag/malta.png"), country: "Malta" },
  {
    src: require("../../flag/marshall-islands.png"),
    country: "Marshall Islands",
  },
  { src: require("../../flag/mauritania.png"), country: "Mauritania" },
  { src: require("../../flag/mauritius.png"), country: "Mauritius" },
  { src: require("../../flag/mexico.png"), country: "Mexico" },
  { src: require("../../flag/moldova.png"), country: "Moldova" },
  { src: require("../../flag/monaco.png"), country: "Monaco" },
  { src: require("../../flag/mongolia.png"), country: "Mongolia" },
  { src: require("../../flag/montenegro.png"), country: "Montenegro" },
  { src: require("../../flag/morocco.png"), country: "Morocco" },
  { src: require("../../flag/mozambique-3.png"), country: "Mozambique" },
  { src: require("../../flag/myanmar.png"), country: "Myanmar" },
  { src: require("../../flag/namibia.png"), country: "Namibia" },
  { src: require("../../flag/nauru.png"), country: "Nauru" },
  { src: require("../../flag/nepal.png"), country: "Nepal" },
  { src: require("../../flag/netherlands-3.png"), country: "Netherlands" },
  { src: require("../../flag/new-caledonia.png"), country: "New Caledonia" },
  { src: require("../../flag/new-zealand.png"), country: "New Zealand" },
  { src: require("../../flag/nicaragua-2.png"), country: "Nicaragua" },
  { src: require("../../flag/niger.png"), country: "Niger" },
  { src: require("../../flag/nigeria.png"), country: "Nigeria" },
  { src: require("../../flag/north-korea.png"), country: "North Korea" },
  {
    src: require("../../flag/northern-ireland.png"),
    country: "Northern Ireland",
  },
  { src: require("../../flag/norway.png"), country: "Norway" },
  { src: require("../../flag/oman.png"), country: "Oman" },
  { src: require("../../flag/pakistan.png"), country: "Pakistan" },
  { src: require("../../flag/palau.png"), country: "Palau" },
  { src: require("../../flag/palestine.png"), country: "Palestine" },
  { src: require("../../flag/panama.png"), country: "Panama" },
  {
    src: require("../../flag/papua-new-guinea.png"),
    country: "Papua New Guinea",
  },
  { src: require("../../flag/paraguay.png"), country: "Paraguay" },
  { src: require("../../flag/peru.png"), country: "Peru" },
  { src: require("../../flag/philippines.png"), country: "Philippines" },
  { src: require("../../flag/poland.png"), country: "Poland" },
  { src: require("../../flag/portugal.png"), country: "Portugal" },
  { src: require("../../flag/puerto-rico.png"), country: "Puerto Rico" },
  { src: require("../../flag/qatar.png"), country: "Qatar" },
  { src: require("../../flag/romania.png"), country: "Romania" },
  { src: require("../../flag/russia.png"), country: "Russia" },
  { src: require("../../flag/rwanda.png"), country: "Rwanda" },
  { src: require("../../flag/saint-lucia.png"), country: "Saint Lucia" },
  {
    src: require("../../flag/saint-vincent-and-the-grenadines.png"),
    country: "Saint Vincent and the Grenadines",
  },
  { src: require("../../flag/samoa.png"), country: "Samoa" },
  { src: require("../../flag/san-marino.png"), country: "San Marino" },
  {
    src: require("../../flag/sao-tome-and-principe.png"),
    country: "Sao Tome and Principe",
  },
  { src: require("../../flag/saudi-arabia.png"), country: "Saudi Arabia" },
  { src: require("../../flag/scotland.png"), country: "Scotland" },
  { src: require("../../flag/senegal.png"), country: "Senegal" },
  { src: require("../../flag/serbia.png"), country: "Serbia" },
  { src: require("../../flag/seychelles.png"), country: "Seychelles" },
  { src: require("../../flag/sierra-leone-2.png"), country: "Sierra Leone" },
  { src: require("../../flag/singapore.png"), country: "Singapore" },
  { src: require("../../flag/slovakia-2.png"), country: "Slovakia" },
  { src: require("../../flag/slovenia.png"), country: "Slovenia" },
  {
    src: require("../../flag/solomon-islands.png"),
    country: "Solomon Islands",
  },
  { src: require("../../flag/south-africa.png"), country: "South Africa" },
  { src: require("../../flag/south-korea.png"), country: "South Korea" },
  { src: require("../../flag/south-sudan.png"), country: "South Sudan" },
  { src: require("../../flag/spain.png"), country: "Spain" },
  { src: require("../../flag/sri-lanka.png"), country: "Sri Lanka" },
  { src: require("../../flag/sudan.png"), country: "Sudan" },
  { src: require("../../flag/suriname.png"), country: "Suriname" },
  { src: require("../../flag/sweden.png"), country: "Sweden" },
  { src: require("../../flag/switzerland.png"), country: "Switzerland" },
  { src: require("../../flag/syria.png"), country: "Syria" },
  { src: require("../../flag/taiwan.png"), country: "Taiwan" },
  { src: require("../../flag/tajikistan.png"), country: "Tajikistan" },
  { src: require("../../flag/tanzania.png"), country: "Tanzania" },
  { src: require("../../flag/thailand.png"), country: "Thailand" },
  { src: require("../../flag/togo.png"), country: "Togo" },
  { src: require("../../flag/tonga.png"), country: "Tonga" },
  { src: require("../../flag/tunisia.png"), country: "Tunisia" },
  { src: require("../../flag/turkey.png"), country: "Turkey" },
  { src: require("../../flag/turkmenistan.png"), country: "Turkmenistan" },
  {
    src: require("../../flag/turks-and-caicos-islands.png"),
    country: "Turks and Caicos Islands",
  },
  { src: require("../../flag/tuvalu.png"), country: "Tuvalu" },
  { src: require("../../flag/uganda.png"), country: "Uganda" },
  { src: require("../../flag/uk.png"), country: "United Kingdom" },
  { src: require("../../flag/ukraine.png"), country: "Ukraine" },
  {
    src: require("../../flag/united-arab-emirates.png"),
    country: "United Arab Emirates",
  },
  { src: require("../../flag/uruguay.png"), country: "Uruguay" },
  { src: require("../../flag/usa.png"), country: "United States" },
  { src: require("../../flag/uzbekistan.png"), country: "Uzbekistan" },
  { src: require("../../flag/vanuatu.png"), country: "Vanuatu" },
  { src: require("../../flag/vatican.png"), country: "Vatican" },
  { src: require("../../flag/venezuela.png"), country: "Venezuela" },
  { src: require("../../flag/vietnam.png"), country: "Vietnam" },
  { src: require("../../flag/wales.png"), country: "Wales" },
  { src: require("../../flag/yemen.png"), country: "Yemen" },
  { src: require("../../flag/zimbabwe.png"), country: "Zimbabwe" },
  { src: require("../../flag/flag.png"), country: "Flag" },
];

export default country;