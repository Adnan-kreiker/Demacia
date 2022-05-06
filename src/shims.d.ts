/* eslint-disable import/no-duplicates */

declare interface Window {
  // extend the window
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module 'v-lazy-image' {

}

declare module 'rollup-plugin-analyzer' {

}

// declare module 'vue-virtual-scroller' {

declare module 'vue-virtual-scroller' {
  export const RecycleScroller: any
}
// }