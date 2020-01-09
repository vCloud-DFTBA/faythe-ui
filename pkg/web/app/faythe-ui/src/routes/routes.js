import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import CloudsTable from "@/pages/CloudsTable.vue";

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
      }
    ]
  }
];

export default routes;
