import type { TranslationMap } from './types';

const esCO: TranslationMap = {
  nav: {
    title: 'Mundial 2026',
    album: 'Álbum',
    profile: 'Perfil',
    logout: 'Salir',
    footer: 'Panini Mundial 2026 • Rastreador Minimalista',
    backToAlbum: 'Volver al álbum',
  },
  home: {
    title: 'Álbum Mundial 2026',
    subtitle: 'Sistema de Seguimiento de Figuritas',
    inputPlaceholder: 'INGRESA TU NOMBRE...',
    enterButton: 'Entrar al Álbum',
    continueAs: 'Continuar como:',
  },
  userHeader: {
    guest: 'Invitado',
    progress: 'Progreso',
    of: 'de',
    stickers: 'figuritas',
  },
  stats: {
    total: 'Total',
    owned: 'Tengo',
    missing: 'Faltan',
    duplicates: 'Repetidas',
  },
  filter: {
    searchPlaceholder: 'BUSCAR POR ID O NOMBRE',
    allSections: 'TODAS LAS SECCIONES',
    tabs: {
      all: 'TODAS',
      owned: 'TENGO',
      missing: 'FALTAN',
      duplicates: 'REPETIDAS',
    },
    groups: 'GRUPOS',
    all: 'TODOS',
  },
  sticker: {
    status: {
      missing: 'Faltante',
      owned: 'Tengo',
      duplicate: 'Repetida',
    },
    group: 'GRUPO',
    expand: '[+] EXPANDIR',
    collapse: '[-] COLAPSAR',
    noResults: 'No se encontraron figuritas',
  },
  profile: {
    dataManagement: 'Gestión de Datos',
    exportTitle: 'Exportar Álbum',
    exportDescription: 'Copia este código para respaldar tu progreso o compartirlo.',
    copyButton: 'Copiar al portapapeles',
    copiedAlert: '¡Copiado al portapapeles!',
    importTitle: 'Importar Álbum',
    importDescription: 'Pega el código JSON para restaurar tu progreso.',
    restoreButton: 'Restaurar Datos',
    importConfirm: 'Esto sobreescribirá tu progreso actual. ¿Continuar?',
    duplicateStickers: 'Figuritas Repetidas',
    noDuplicates: 'Aún no tienes figuritas repetidas',
  },
  notFound: {
    error: 'Error 404',
    title: 'Página No Encontrada',
    message: 'La ruta que solicitaste no existe.',
    backButton: 'Volver al Inicio',
  },
};

export default esCO;
