<template>
  <Layout>
    <Content>
      <Form ref="formValidate" :model="reporte" :rules="ruleValidate">
        <Row :gutter="4">
          <Col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <img src="../assets/icono_correo.png" style="width: 64px;" />
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                style="text-align: center;"
              >
                <span style="font-size: 16px;">
                  Reporte aquí posibles daños
                </span>
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <Consulta />
              </Col>
            </Row>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <Row>
              <Col>
                <span style="font-size: 16px; font-weight: bold;">
                  Ingrese sus datos
                </span>
              </Col>
            </Row>
            <Row :gutter="4">
              <Col :span="24">
                <FormItem label="Nombre Completo" prop="repo_nombre">
                  <Input
                    v-model="reporte.repo_nombre"
                    placeholder="Nombres y Apellidos"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Teléfono" prop="repo_telefono">
                  <Input
                    v-model="reporte.repo_telefono"
                    placeholder="Teléfono Móvil o Fijo"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Correo Electrónico">
                  <Input
                    v-model="reporte.repo_email"
                    placeholder="Dirección de Correo Electrónico"
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <Row>
              <Col>
                <span style="font-size: 16px; font-weight: bold;">
                  Información de la Luminaria
                </span>
              </Col>
            </Row>
            <Row :gutter="4">
              <Col :span="24">
                <FormItem label="Dirección Luminaria" prop="repo_direccion">
                  <Input v-model="reporte.repo_direccion" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Barrio Luminaria" prop="barr_id">
                  <Select
                    v-model="reporte.barr_id"
                    style="text-align: left; width: 100% !important;"
                    filterable
                    clearable
                  >
                    <Option
                      v-for="b in barrios"
                      :value="b.barr_id"
                      :key="b.barr_id"
                    >
                      {{ b.barr_descripcion }}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Daño Que Presenta" prop="acti_id">
                  <Select
                    v-model="reporte.acti_id"
                    style="text-align: left; width: 100% !important;"
                    filterable
                    clearable
                  >
                    <Option
                      v-for="a in actividades"
                      :value="a.acti_id"
                      :key="a.acti_id"
                    >
                      {{ a.acti_descripcion }}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Descripción Adicional del Daño">
                  <Input
                    type="textarea"
                    :rows="4"
                    v-model="reporte.repo_descripcion"
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <Row>
              <Col>
                <span style="font-size: 16px; font-weight: bold;">
                  Resolver la Suma {{ captcha.numeroa }} + {{ captcha.numerob }}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Digíte su respuesta" prop="repo_captcha">
                  <Input v-model="reporte.repo_captcha" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Para registrar el reporte realice la operación arriba
                  solicitada
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  style="font-size: 16px; font-weight: 400; background-color: #FFC400;"
                  @click="validar('formValidate')"
                >
                  Enviar Reporte
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Content>
  </Layout>
</template>
<script>
import Consulta from "./Consulta.vue";
export default {
  components: {
    Consulta
  },
  data() {
    return {
      reporte: {
        repo_nombre: null,
        repo_telefono: null,
        repo_email: null,
        repo_direccion: null,
        barr_id: null,
        acti_id: null,
        repo_descripcion: null,
        repo_captcha: null
      },
      barrios: [],
      actividades: [],
      ruleValidate: {
        repo_nombre: [
          {
            required: true,
            message: "Debe diligenciar el nombre completo",
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
  created() {
    this.getDataBarrio();
    this.getDataAccion();
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
          if (this.reporte.repo_captcha === this.captcha.result) {
            console.log("Enviar Datos");
          } else {
            this.$Message.error({
              content: "La respuesta dada no es correcta!",
              duration: 5
            });
          }
        } else {
          this.$Message.error({
            content: "Faltan datos por diligenciar en el formulario!",
            duration: 5
          });
        }
      });
    },
    getDataBarrio() {
      this.$http
        .get(
          "http://siap.iluminacionsanjuangiron.com/api/barr/gbi/1/43f44388-5cd1-4657-9f7e-ea4e014e9333"
        )
        .then(response => {
          this.barrios = response.data;
          console.log("Barrios: " + JSON.stringify(this.barrios));
        });
    },
    getDataAccion() {
      this.$http
        .get(
          "http://siap.iluminacionsanjuangiron.com/api/acti/gbi/43f44388-5cd1-4657-9f7e-ea4e014e9333"
        )
        .then(response => {
          this.actividades = response.data;
          console.log("Actividades: " + JSON.stringify(this.actividades));
        });
    }
  }
};
</script>
