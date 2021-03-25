<template>
  <Layout>
    <Content>
      <Form ref="formValidate" :model="consulta" :rules="ruleValidate">
        <Row>
          <Col :span="12">
            <span>Si ya tienen un Número de Rádicado, digitelo aquí</span>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem prop="repo_consecutivo">
              <Input
                v-model.number="consulta.repo_consecutivo"
                placeholder="Número Radicado"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <Button
              :disabled="!consulta.repo_consecutivo"
              style="font-size: 16px; font-weight: 400; background-color: #FFC400;"
              @click="validar('formValidate')"
            >
              Consultar
            </Button>
          </Col>
        </Row>
      </Form>
    </Content>
    <Modal v-model="showModal" style="width: 600px;">
      <p slot="header" style="font-size: 20px; color:#FFC400;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>Consulta de Reporte</span>
      </p>
      <div style="font-size: 18px;">
        <Layout>
          <Content>
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>Número de Radicado</span>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                style="font-weight: bold; font-size: 24px;"
              >
                {{ reporte.repo_consecutivo }}
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>Estado</span>
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                style="font-weight: bold; font-size: 26px;"
              >
                {{ reporte.rees_descripcion }}
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>Dirección</span>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">{{
                reporte.repo_direccion
              }}</Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>Barrio</span>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">{{
                reporte.barr_descripcion
              }}</Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>Descripción del Problema</span>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">{{
                reporte.repo_descripcion
              }}</Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>Evento</span>
              </Col>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <span>MANTENIMIENTO</span>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
      <div slot="footer">
        <Button
          @click="showModal = false"
          size="large"
          long
          style="font-size: 16px; font-weight: 400; background-color: #FFC400;"
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  el: "Consulta",
  computed: {
    ...mapGetters(["url"])
  },
  data() {
    return {
      consulta: {
        repo_consecutivo: null
      },
      reporte: {
        repo_consecutivo: null,
        repo_direccion: null,
        barr_id: null,
        acti_id: null,
        repo_descripcion: null,
        repo_reportetecnico: null,
        repo_fechasolucion: null,
        repo_horainicio: null,
        repo_horafin: null
      },
      barrios: [],
      actividades: [],
      showModal: false,
      ruleValidate: {
        repo_consecutivo: [
          {
            required: true,
            type: "number",
            message: "Debe diligenciar el Número de Rádicado",
            trigger: "blur"
          }
        ],
        repo_telefono: [
          {
            required: true,
            message: "Debe diligenciar el teléfono",
            trigger: "blur"
          }
        ],
        repo_email: [
          {
            required: true,
            message: "Debe diligenciar el correo electrónico",
            trigger: "blur"
          }
        ],
        repo_direccion: [
          {
            required: true,
            message: "Debe diligenciar la dirección de la Luminaria",
            trigger: "blur"
          }
        ],
        barr_id: [
          {
            required: true,
            type: "number",
            message:
              "Debe seleccionar el barrio donde se encuentra la Luminaria",
            trigger: "change"
          }
        ],
        acti_id: [
          {
            required: true,
            type: "number",
            message: "Debe seleccionar el daño que presenta la luminaria",
            trigger: "change"
          }
        ],
        repo_descripcion: [
          {
            required: true,
            message: "Debe describir el daño que presenta a luminaria",
            trigger: "blur"
          }
        ],
        repo_captcha: [
          {
            required: true,
            message: "Debe digitar su respuesta",
            trigger: "blur"
          }
        ]
      },
      captcha: {
        numeroa: null,
        numerob: null,
        result: null
      }
    };
  },
  beforeMount() {
    this.getDataBarrio();
  },
  mounted() {
    this.captcha.numeroa = Math.floor(Math.random() * 10 + 1);
    this.captcha.numerob = Math.floor(Math.random() * 10 + 1);
    this.captcha.result = this.captcha.numeroa + this.captcha.numerob;
  },
  methods: {
    validar(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .get(
              this.url +
                "/api/repo/gbtcw/" +
                //"https://siap.iluminacionsanjuangiron.com/api/repo/gbtcw/" +
                this.consulta.repo_consecutivo +
                "/1/43f44388-5cd1-4657-9f7e-ea4e014e9333"
            )
            .then(response => {
              this.consulta.repo_consecutivo = null;
              this.reporte = response.data;
              this.showModal = true;
            })
            .catch(() => {
              this.consulta.repo_consecutivo = null;
              this.$Message.error({
                content: "No se encontró ese número de radicado",
                duration: 10
              });
            });
        } else {
          this.$Message.error({
            content: "Por favor ingrese el número de radicado!",
            duration: 5
          });
        }
      });
    },
    barrio(barr_id) {
      if (barr_id === undefined || barr_id === null) {
        return "";
      } else {
        return this.barrios.find(b => b.barr_id === barr_id, {
          barr_descripcion: ""
        }).barr_descripcion;
      }
    },
    estado(rees_id) {
      if (rees_id === undefined || rees_id === null) {
        return "";
      } else {
        return this.estados.find(e => e.rees_id === rees_id, {
          rees_descripcion: ""
        }).rees_descripcion;
      }
    },
    actividad(acti_id) {
      if (acti_id === undefined || acti_id === null) {
        return "";
      } else {
        return this.actividades.find(a => a.acti_id === acti_id, {
          acti_descripcion: ""
        }).acti_descripcion;
      }
    },
    getDataBarrio() {
      this.$http
        .get(
          this.url + "/api/barr/gbi/1/43f44388-5cd1-4657-9f7e-ea4e014e9333"
          //"http://siap.iluminacionsanjuangiron.com/api/barr/gbi/1/43f44388-5cd1-4657-9f7e-ea4e014e9333"
        )
        .then(response => {
          this.barrios = response.data;
          this.getDataAccion();
        });
    },
    getDataAccion() {
      this.$http
        .get(
          this.url + "/api/acti/gai/43f44388-5cd1-4657-9f7e-ea4e014e9333"
          //"http://siap.iluminacionsanjuangiron.com/api/acti/gai/43f44388-5cd1-4657-9f7e-ea4e014e9333"
        )
        .then(response => {
          this.actividades = response.data;
        });
    }
  }
};
</script>
