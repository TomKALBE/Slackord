export { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faPlus,
  faUser,
  faChevronDown,
  faChevronLeft,
  faBell,
  faMagnifyingGlass,
  faUserGroup,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser as faRegularUser,
  faBell as faRegularBell
} from "@fortawesome/free-regular-svg-icons";
library.add(
  faCheck,
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
  faSignOut
);
