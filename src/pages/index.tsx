import * as React from "react";
import { Link } from "gatsby";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import {
  Button,
  Segment,
  Container,
  Grid,
  Header,
  Icon,
} from "semantic-ui-react";
import { Home } from './Home'


const IndexPage = (props: LayoutProps) =>
  <div>
    {/* Master head */}

    <Home></Home>
  </div>;

export default withLayout(IndexPage);
