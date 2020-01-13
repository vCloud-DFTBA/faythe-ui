import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import CloudsTable from "@/pages/CloudsTable.vue";
import CreateCloud from "@/pages/CreateCloud.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/clouds",
    children: [
      {
        path: "clouds",
        name: "Clouds List",
        component: CloudsTable
      },
      {
        path: "clouds/create",
        name: "Create Clouds",
        component: CreateCloud
      }
    ]
  }
];

export default routes;
