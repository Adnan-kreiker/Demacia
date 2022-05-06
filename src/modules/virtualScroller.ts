import { UserModule } from '~/types'
import { RecycleScroller } from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'


export const install: UserModule = ({ app }) => {
  app.component('RecycleScroller', RecycleScroller)


}