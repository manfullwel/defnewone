import { readFileSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

function semverSatisfies(version, range) {
  const [major] = version.split('.').map(Number);
  const [targetMajor] = range.replace('^', '').split('.').map(Number);
  return major === targetMajor;
}

async function checkDependencies() {
  try {
    console.log(' Verificando compatibilidade de dependências...\n');
    
    // Lê o package.json
    const packageJson = JSON.parse(
      readFileSync(join(rootDir, 'package.json'), 'utf8')
    );

    // Lista de dependências conhecidas com versões compatíveis
    const compatibilityList = {
      'date-fns': {
        version: '2.30.0',
        versionRange: '^2.30.0',
        dependencies: ['react-day-picker']
      },
      'lucide-react': {
        version: '0.309.0',
        versionRange: '^0.309.0'
      }
    };

    // Verifica as dependências instaladas
    const { stdout } = await execAsync('npm ls --json');
    const installedDeps = JSON.parse(stdout);

    let hasErrors = false;
    let fixes = new Set();

    // Verifica cada dependência na lista de compatibilidade
    for (const [pkg, config] of Object.entries(compatibilityList)) {
      if (installedDeps.dependencies[pkg]) {
        const installedVersion = installedDeps.dependencies[pkg].version;
        console.log(` Verificando ${pkg}@${installedVersion}...`);
        
        // Verifica se a versão instalada satisfaz o range necessário
        if (!semverSatisfies(installedVersion, config.versionRange)) {
          console.error(
            `  Versão ${installedVersion} de ${pkg} não satisfaz o requisito ${config.versionRange}`
          );
          hasErrors = true;
          fixes.add(`npm install ${pkg}@${config.version} --save-exact`);
        }

        // Verifica dependências relacionadas
        if (config.dependencies) {
          for (const depPkg of config.dependencies) {
            if (installedDeps.dependencies[depPkg]) {
              console.log(`  Verificando dependência ${depPkg}...`);
            }
          }
        }
      }
    }

    if (hasErrors) {
      console.error('\n Encontrados problemas com dependências\n');
      console.log('Para corrigir, execute os seguintes comandos em ordem:\n');
      fixes.forEach(fix => console.log(fix));
      process.exit(1);
    }

    console.log('\n Todas as dependências estão corretas!');
  } catch (error) {
    console.error('Erro ao verificar dependências:', error);
    process.exit(1);
  }
}

checkDependencies();
