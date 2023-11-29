import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon.vue';

import XForm from './Form/index.vue';
import GradientPage from './GradientPage/index.vue';
import PageTitle from './PageTitle/index.vue';
import ModuleTitle from '../views/donationFlows/components/ModuleTitle.vue';
import Card from './Card/index.vue';
import ActionButton from './ActionButton/index.vue';
import CardButton from './CardButton/index.vue';

const components = {
  SvgIcon,
  XForm,
  GradientPage,
  Card,
  PageTitle,
  ModuleTitle,
  ActionButton,
  CardButton
}
export const registryComponents = (App) => {
  Object.entries(components).forEach(([name, component]) => {
    App.component(name, component)
  })
}