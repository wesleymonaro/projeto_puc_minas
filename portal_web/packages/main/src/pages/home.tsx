import React from "react";
import Home from "src/containers/home";
import Layout from "../layouts";
import Content from "../layouts/content";
import WelcomeArea from "../containers/dashboard-one/welcome-area";
import SEO from "../components/seo";

const HomePage: React.FC = () => {
  return (
    <Layout hideFooter>
      <SEO />
      <Content>
        {/* <WelcomeArea /> */}
        <Home />
      </Content>
    </Layout>
  );
};

export default HomePage;
