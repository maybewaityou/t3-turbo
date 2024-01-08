import type { PlopTypes } from '@turbo/gen'
import { execSync } from 'node:child_process'
import { testTmpl } from './rawTmpl/testTmpl'

interface PackageJson {
  name: string
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('init', {
    description: 'Generate a new package for the Acme Monorepo',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of package would you like to create?',
        choices: ['vendors', 'packages'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the package? (You can skip the `@acme/` prefix)',
      },
      {
        type: 'input',
        name: 'deps',
        message: 'Enter a space separated list of dependencies you would like to install',
      },
    ],
    actions: [
      (answers) => {
        if ('name' in answers && typeof answers.name === 'string') {
          if (answers.name.startsWith('@acme/')) {
            answers.name = answers.name.replace('@acme/', '')
          }
        }
        return 'Config sanitized'
      },
      {
        type: 'add',
        path: '{{ type }}/{{ name }}/package.json',
        templateFile: 'templates/package.json.hbs',
      },
      {
        type: 'add',
        path: '{{ type }}/{{ name }}/tsconfig.json',
        templateFile: 'templates/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: '{{ type }}/{{ name }}/src/index.ts',
        template: "export const name = '{{ name }}';",
      },
      {
        type: 'add',
        path: '{{ type }}/{{ name }}/__test__/index.spec.ts',
        template: testTmpl,
      },
      {
        type: 'modify',
        path: '{{ type }}/{{ name }}/package.json',
        async transform(content, answers) {
          if ('deps' in answers && typeof answers.deps === 'string') {
            const pkg = JSON.parse(content) as PackageJson
            for (const dep of answers.deps.split(' ').filter(Boolean)) {
              const version = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
                .then((res) => res.json())
                .then((json) => json.latest)
              if (!pkg.dependencies) pkg.dependencies = {}
              pkg.dependencies[dep] = `^${version}`
            }
            return JSON.stringify(pkg, null, 2)
          }
          return content
        },
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        if ('name' in answers && typeof answers.name === 'string') {
          // execSync("pnpm dlx sherif@latest --fix", {
          //   stdio: "inherit",
          // });
          execSync('pnpm i', { stdio: 'inherit' })
          execSync(`pnpm prettier --write ${answers['type']}/${answers.name}/** --list-different`)
          return 'Package scaffolded'
        }
        return 'Package not scaffolded'
      },
    ],
  })
}
