import * as React from "react";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import { Home } from "./Home";

const IndexPage = (props: LayoutProps) =>
    <Home></Home>;

export default withLayout(IndexPage);
