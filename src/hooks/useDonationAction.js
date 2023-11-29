import { computed, unref } from 'vue';
import { ProjectType } from '@/views/issueRequest/model/enum.js';
import { useRouter, useRoute } from 'vue-router';


export default function useDonationAction(projectInfo) {
  const router = useRouter()
  const route = useRoute()
  
  const isDonationProject = computed(() => {
    return unref(projectInfo).donation_type === ProjectType.DONATION
  })
  
  const donationAction = () => {
    if (unref(isDonationProject)) {
      router.push({
        path: '/donationForm',
        query: {
          id: unref(projectInfo).prj_id || route.query.id
        }
      })
    } else {
      router.push({
        path: '/donationWay'
      })
    }
  }
  
  const actionDonationText = computed(() => {
    return unref(isDonationProject) ? '我要捐赠' : '我要认捐'
  })
  
  
  return {
    donationAction,
    actionDonationText,
    isDonationProject
  }
}