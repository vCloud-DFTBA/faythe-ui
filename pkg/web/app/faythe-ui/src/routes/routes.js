import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import CloudsTable from "@/pages/CloudsTable.vue";
import CreateCloud from "@/pages/CreateCloud.vue";
import HealersTable from "@/pages/HealersTable";
import ScalersTable from "@/pages/ScalersTable";

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
      },
      {
        path: "healers",
        name: "Healers List",
        component: HealersTable
      },
      {
        path: "scalers",
        name: "Scalers List",
        component: ScalersTable
      }
    ]
  }
];

export default routes;
