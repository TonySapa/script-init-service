export type GetCountryResponse = [
  {
    name: {
      common: string // 'Spain'
      official: string // 'Kingdom of Spain'
      nativeName: { spa: { official: 'Reino de España'; common: 'España' } }
    }
    tld: ['.es']
    cca2: 'ES'
    ccn3: '724'
    cca3: 'ESP'
    cioc: 'ESP'
    independent: true
    status: 'officially-assigned'
    unMember: true
    currencies: { EUR: { name: 'Euro'; symbol: '€' } }
    idd: { root: '+3'; suffixes: ['4'] }
    capital: ['Madrid']
    altSpellings: ['ES', 'Kingdom of Spain', 'Reino de España']
    region: 'Europe'
    subregion: 'Southern Europe'
    languages: { spa: 'Spanish' }
    translations: {
      ara: { official: 'مملكة إسبانيا'; common: 'إسبانيا' }
      ces: { official: 'Španělské království'; common: 'Španělsko' }
      cym: { official: 'Kingdom of Spain'; common: 'Spain' }
      deu: { official: 'Königreich Spanien'; common: 'Spanien' }
      est: { official: 'Hispaania Kuningriik'; common: 'Hispaania' }
      fin: { official: 'Espanjan kuningaskunta'; common: 'Espanja' }
      fra: { official: "Royaume d'Espagne"; common: 'Espagne' }
      hrv: { official: 'Kraljevina Španjolska'; common: 'Španjolska' }
      hun: { official: 'Spanyol Királyság'; common: 'Spanyolország' }
      ita: { official: 'Regno di Spagna'; common: 'Spagna' }
      jpn: { official: 'スペイン王国'; common: 'スペイン' }
      kor: { official: '에스파냐 왕국'; common: '스페인' }
      nld: { official: 'Koninkrijk Spanje'; common: 'Spanje' }
      per: { official: 'پادشاهی اسپانیا'; common: 'اسپانیا' }
      pol: { official: 'Królestwo Hiszpanii '; common: 'Hiszpania' }
      por: { official: 'Reino de Espanha'; common: 'Espanha' }
      rus: { official: 'Королевство Испания'; common: 'Испания' }
      slk: { official: 'Španielske kráľovstvo'; common: 'Španielsko' }
      spa: { official: 'Reino de España'; common: 'España' }
      swe: { official: 'Konungariket Spanien'; common: 'Spanien' }
      urd: { official: 'مملکتِ ہسپانیہ'; common: 'ہسپانیہ' }
      zho: { official: '西班牙王国'; common: '西班牙' }
    }
    latlng: [40.0, -4.0]
    landlocked: false
    borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR']
    area: 505992.0
    demonyms: {
      eng: { f: 'Spanish'; m: 'Spanish' }
      fra: { f: 'Espagnole'; m: 'Espagnol' }
    }
    flag: '\uD83C\uDDEA\uD83C\uDDF8'
    maps: {
      googleMaps: 'https://goo.gl/maps/138JaXW8EZzRVitY9'
      openStreetMaps: 'https://www.openstreetmap.org/relation/1311341'
    }
    population: 47351567
    gini: { '2018': 34.7 }
    fifa: 'ESP'
    car: { signs: ['E']; side: 'right' }
    timezones: ['UTC', 'UTC+01:00']
    continents: ['Europe']
    flags: {
      png: 'https://flagcdn.com/w320/es.png'
      svg: 'https://flagcdn.com/es.svg'
    }
    coatOfArms: {
      png: 'https://mainfacts.com/media/images/coats_of_arms/es.png'
      svg: 'https://mainfacts.com/media/images/coats_of_arms/es.svg'
    }
    startOfWeek: 'monday'
    capitalInfo: { latlng: [40.4, -3.68] }
    postalCode: { format: '#####'; regex: '^(\\d{5})$' }
  }
]

/******************************************************************************
 * Used to define a range of numbers.
 * See: https://github.com/microsoft/TypeScript/pull/45711
 *****************************************************************************/
type Ran<T extends number> = number extends T ? number : _Range<T, []>
type _Range<T extends number, R extends unknown[]> = R['length'] extends T
  ? R[number]
  : _Range<T, [R['length'], ...R]>

/******************************************************************************
 * @type Defines the range of existing status code. (100-599)
 * See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 *****************************************************************************/
export type StatusCode = Ran<599>
