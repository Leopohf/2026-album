import fs from 'fs';
import path from 'path';

const inputPath = 'raw/info-extraction-script/extracted_stickers.json';
const outputDir = 'raw/front_source/src/app/data/sections';

const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const teams = [
  { id: 'ARG', name: 'Argentina', file: 'argentina' },
  { id: 'RSA', name: 'South Africa', file: 'south-africa' },
  { id: 'KOR', name: 'Korea Republic', file: 'korea-republic' },
  { id: 'CZE', name: 'Czechia', file: 'czechia' },
  { id: 'CAN', name: 'Canada', file: 'canada' },
  { id: 'BIH', name: 'Bosnia-Herzegovina', file: 'bosnia-herzegovina' },
  { id: 'QAT', name: 'Qatar', file: 'qatar' },
  { id: 'SUI', name: 'Switzerland', file: 'switzerland' },
  { id: 'BRA', name: 'Brazil', file: 'brazil' },
  { id: 'MAR', name: 'Morocco', file: 'morocco' },
  { id: 'HAI', name: 'Haiti', file: 'haiti' },
  { id: 'SCO', name: 'Scotland', file: 'scotland' },
  { id: 'USA', name: 'USA', file: 'usa' },
  { id: 'PAR', name: 'Paraguay', file: 'paraguay' },
  { id: 'AUS', name: 'Australia', file: 'australia' },
  { id: 'TUR', name: 'Türkiye', file: 'turkiye' },
  { id: 'GER', name: 'Germany', file: 'germany' },
  { id: 'CUW', name: 'Curaçao', file: 'curacao' },
  { id: 'CIV', name: 'Côte d\'Ivoire', file: 'cote-divoire' },
  { id: 'ECU', name: 'Ecuador', file: 'ecuador' },
  { id: 'NED', name: 'Netherlands', file: 'netherlands' },
  { id: 'JPN', name: 'Japan', file: 'japan' },
  { id: 'SWE', name: 'Sweden', file: 'sweden' },
  { id: 'TUN', name: 'Tunisia', file: 'tunisia' },
  { id: 'BEL', name: 'Belgium', file: 'belgium' },
  { id: 'EGY', name: 'Egypt', file: 'egypt' },
  { id: 'IRN', name: 'IR Iran', file: 'iran' },
  { id: 'NZL', name: 'New Zealand', file: 'new-zealand' },
  { id: 'ESP', name: 'Spain', file: 'spain' },
  { id: 'CPV', name: 'Cabo Verde', file: 'cabo-verde' },
  { id: 'KSA', name: 'Saudi Arabia', file: 'saudi-arabia' },
  { id: 'URU', name: 'Uruguay', file: 'uruguay' },
  { id: 'FRA', name: 'France', file: 'france' },
  { id: 'SEN', name: 'Senegal', file: 'senegal' },
  { id: 'IRQ', name: 'Iraq', file: 'iraq' },
  { id: 'NOR', name: 'Norway', file: 'norway' },
  { id: 'ALG', name: 'Algeria', file: 'algeria' },
  { id: 'AUT', name: 'Austria', file: 'austria' },
  { id: 'JOR', name: 'Jordan', file: 'jordan' },
  { id: 'POR', name: 'Portugal', file: 'portugal' },
  { id: 'COD', name: 'Congo DR', file: 'congo-dr' },
  { id: 'UZB', name: 'Uzbekistan', file: 'uzbekistan' },
  { id: 'COL', name: 'Colombia', file: 'colombia' },
  { id: 'ENG', name: 'England', file: 'england' },
  { id: 'CRO', name: 'Croatia', file: 'croatia' },
  { id: 'GHA', name: 'Ghana', file: 'ghana' },
  { id: 'PAN', name: 'Panama', file: 'panama' },
  { id: 'MEX', name: 'Mexico', file: 'mexico' }
];

const manualNames = {
  // Argentina
  'ARG-02': 'EMILIANO MARTÍNEZ', 'ARG-03': 'NAHUEL MOLINA', 'ARG-04': 'CRISTIAN ROMERO', 'ARG-05': 'NICOLÁS OTAMENDI',
  'ARG-06': 'NICOLÁS TAGLIAFICO', 'ARG-07': 'LEONARDO BALERDI', 'ARG-08': 'ENZO FERNÁNDEZ', 'ARG-09': 'ALEXIS MAC ALLISTER',
  'ARG-10': 'RODRIGO DE PAUL', 'ARG-11': 'EXEQUIEL PALACIOS', 'ARG-12': 'LEANDRO PAREDES', 'ARG-13': 'ARGENTINA EMBLEM',
  'ARG-14': 'FRANCO MASTANTUONO', 'ARG-15': 'NICO GONZÁLEZ', 'ARG-17': 'LIONEL MESSI', 'ARG-18': 'LAUTARO MARTÍNEZ',
  'ARG-19': 'JULIÁN ÁLVAREZ', 'ARG-20': 'GIULIANO SIMEONE',
  // IR Iran
  'IRN-02': 'ALIREZA BEIRANVAND', 'IRN-03': 'MORTEZA POURALIGANJI', 'IRN-04': 'EHSAN HAJSAFI', 'IRN-05': 'MILAD MOHAMMADI',
  'IRN-06': 'SHOJAE KHALILZADEH', 'IRN-07': 'RAMIN REZAEIAN', 'IRN-08': 'HOSSEIN KANAANI', 'IRN-09': 'SADEGH MOHARRAMI',
  'IRN-10': 'SALEH HARDANI', 'IRN-11': 'SAEED EZATOLAHI', 'IRN-12': 'SAMAN GHODDOS', 'IRN-13': 'IR IRAN EMBLEM',
  'IRN-14': 'OMID NOORAFKAN', 'IRN-15': 'ROOZBEH CHESHMI', 'IRN-16': 'MOHAMMAD MOHEBI', 'IRN-17': 'SARDAR AZMOUN',
  'IRN-18': 'MEHDI TAREMI', 'IRN-19': 'ALIREZA JAHANBAKHSH', 'IRN-20': 'ALI GHOLIZADEH',
  // New Zealand
  'NZL-02': 'MAX CROCOMBE', 'NZL-03': 'ALEX PAULSEN', 'NZL-04': 'MICHAEL BOXALL', 'NZL-05': 'LIBERATO CACACE',
  'NZL-06': 'TIM PAVNE', 'NZL-07': 'TYLER BINDON', 'NZL-08': 'FRANCIS DE VRIES', 'NZL-09': 'FINN SURMAN',
  'NZL-10': 'JOE BELL', 'NZL-11': 'SARPREET SINGH', 'NZL-12': 'RYAN THOMAS', 'NZL-13': 'NEW ZEALAND EMBLEM',
  'NZL-14': 'MATTHEW GARBETT', 'NZL-15': 'MARKO STAMENIĆ', 'NZL-16': 'BEN OLD', 'NZL-17': 'CHRIS WOOD',
  'NZL-18': 'ELIJAH JUST', 'NZL-19': 'CALLUM MCCOWATT', 'NZL-20': 'KOSTA BARBAROUSES',
  // Spain
  'ESP-02': 'UNAI SIMÓN', 'ESP-03': 'ROBIN LE NORMAND', 'ESP-04': 'AYMERIC LAPORTE', 'ESP-05': 'DEAN HUIJSEN',
  'ESP-06': 'PEDRO PORRO', 'ESP-07': 'DANI CARVAJAL', 'ESP-08': 'MARC CUCURELLA', 'ESP-09': 'MARTÍN ZUBIMENDI',
  'ESP-10': 'RODRI', 'ESP-11': 'PEDRI', 'ESP-12': 'FABIÁN RUIZ', 'ESP-13': 'SPAIN EMBLEM',
  'ESP-14': 'MIKEL MERINO', 'ESP-15': 'LAMINE YAMAL', 'ESP-16': 'DANI OLMO', 'ESP-17': 'NICO WILLIAMS',
  'ESP-18': 'FERRAN TORRES', 'ESP-19': 'ÁLVARO MORATA', 'ESP-20': 'MIKEL OYARZABAL'
};

const stickerMap = new Map();
rawData.forEach(s => stickerMap.set(s.id, s));

const sections = {
  'intro.data.ts': { var: 'INTRO_DATA', data: [] },
  'stadiums.data.ts': { var: 'STADIUMS_DATA', data: [] },
  'special.data.ts': { var: 'SPECIAL_DATA', data: [] }
};

// Process Teams
teams.forEach(team => {
  const teamData = [];
  for (let i = 1; i <= 20; i++) {
    const id = `${team.id}-${i.toString().padStart(2, '0')}`;
    let sticker = stickerMap.get(id);
    
    if (!sticker) {
      sticker = {
        id: id,
        numero: i,
        nombre: manualNames[id] || `${team.name} Player ${i}`,
        seccion: team.name,
        grupo: team.name,
        tipo: i === 13 ? 'escudo' : 'jugador',
        tengo: false,
        repetidas: 0
      };
      if (i === 13) sticker.nombre = `${team.name} Emblem`;
    } else {
      if (manualNames[id]) sticker.nombre = manualNames[id];
    }
    teamData.push(sticker);
  }
  sections[`${team.file}.data.ts`] = { var: `${team.file.toUpperCase().replace(/-/g, '_')}_DATA`, data: teamData };
});

// Add non-team stickers
rawData.forEach(sticker => {
  const prefix = sticker.id.split('-')[0];
  if (!teams.find(t => t.id === prefix)) {
    const seccion = sticker.seccion.toLowerCase();
    const tipo = sticker.tipo.toLowerCase();
    if (tipo === 'estadio' || seccion.includes('host countries') || prefix.startsWith('STAD')) {
      sections['stadiums.data.ts'].data.push(sticker);
    } else if (prefix === 'INTRO' || prefix === 'MYPANINI' || prefix === 'FWC') {
      sections['intro.data.ts'].data.push(sticker);
    } else {
      sections['special.data.ts'].data.push(sticker);
    }
  }
});

let aggregatorImports = "import { Sticker } from '../models/sticker.model';\n";
let aggregatorArray = "export const STICKERS_DATA: Sticker[] = [\n";

for (const [file, info] of Object.entries(sections)) {
  const filePath = path.join(outputDir, file);
  const content = `import { Sticker } from '../../models/sticker.model';\n\nexport const ${info.var}: Sticker[] = ${JSON.stringify(info.data, null, 2)};\n`;
  fs.writeFileSync(filePath, content);
  aggregatorImports += `import { ${info.var} } from './sections/${file.replace('.data.ts', '.data')}';\n`;
  aggregatorArray += `  ...${info.var},\n`;
}

aggregatorArray += "];\n";
const aggregatorPath = 'raw/front_source/src/app/data/stickers.data.ts';
fs.writeFileSync(aggregatorPath, aggregatorImports + "\n" + aggregatorArray);

console.log(`Successfully generated full album structure with updated names.`);
