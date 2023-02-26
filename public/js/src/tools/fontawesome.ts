export { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faPlus,
  faUser,
  faChevronDown,
  faBell,
  faMagnifyingGlass,
  faUserGroup,
  faGear
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
  faBell,
  faRegularBell,
  faMagnifyingGlass,
  faUserGroup,
  faGear
);
