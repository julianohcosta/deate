import { Col, Divider, Row } from "antd";
import OptionBar from "./OptionBar";
import styles from "../pages/Styles.module.css";
import DeateEquipe from "./DeateEquipe";
import React from "react";

const RelatorioLayout = props => {
  return (
    <>
      <div>
        <Divider
          orientation="center"
          style={{ marginTop: "0", marginBottom: "0" }}
        >
          Opções de Consulta
        </Divider>
        <Row align="middle" justify="center">
          <Col span={6} />
          <Col span={12}>
            <OptionBar disabled={props.disabled} />
          </Col>
          <Col span={6} />
        </Row>
      </div>

      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className={styles["gutter-row"]}
      >
        <Col span={6} className={styles["gutter-col"]}>
          col-12
        </Col>
        <Col span={18} className={styles["gutter-col"]}>
          <DeateEquipe disabled={props.disabled} equipes={props.equipes} />
        </Col>
      </Row>
    </>
  );
};
export default RelatorioLayout;
