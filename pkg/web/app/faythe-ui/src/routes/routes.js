import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import TableList from "@/pages/TableList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/table",
    children: [
      {
        path: "table",
        name: "Table List",
        component: TableList
      }
    ]
  }
];

export default routes;
