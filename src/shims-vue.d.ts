/**
 * Este archivo proporciona una definición de módulo TypeScript para archivos .vue en un proyecto Vue 3 con TypeScript.
 * Importa DefineComponent de 'vue' y declaro una constante llamada 'component' con el tipo DefineComponent.
 * Exporta la constante 'component' como predeterminada para permitir la importación de archivos .vue en otros archivos TypeScript.
 */

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
