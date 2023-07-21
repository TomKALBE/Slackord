import { library } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCheck,
  faCross,
  faCircleCheck,
  faPlus,
  faUser,
  faChevronDown,
  faChevronLeft,
  faBell,
  faMagnifyingGlass,
  faUserGroup,
  faGear,
  faSignOut,
  faPaperPlane,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser as faRegularUser,
  faBell as faRegularBell
} from "@fortawesome/free-regular-svg-icons";
library.add(
  faCheck,
  faXmark,
  faCross,
  faCircleCheck,
  faPlus,
  faUser,
  faRegularUser,
  faChevronDown,
  faChevronLeft,
  faBell,
  faRegularBell,
  faMagnifyingGlass,
  faUserGroup,
  faGear,
  faSignOut,
  faPaperPlane,
  faCircleExclamation
);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
