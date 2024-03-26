<template>
  <Layout>
    <Content>
      <Form ref="formValidate" :model="reporte" :rules="ruleValidate">
        <Row :gutter="4">
          <Col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <Row>
              <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <img src="../assets/icono_correo.png" style="width: 64px" />
              </Col>
              <Col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                style="text-align: center"
              >
                <span style="font-size: 16px">
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
                <span style="font-size: 16px; font-weight: bold">
                  Ingrese sus datos
                </span>
              </Col>
            </Row>
            <Row :gutter="4">
              <Col :span="24">
                <FormItem label="Nombre Completo" prop="repo_nombre">
                  <Input
                    v-model="reporte.repo_nombre"
                    autofocus
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
                <span style="font-size: 16px; font-weight: bold">
                  Información de la Luminaria
                </span>
              </Col>
            </Row>
            <Row>
              <Col :span="24">
                <FormItem label="Código Luminaria" prop="aap_id">
                  <Input readonly v-model="reporte.aap_id" />
                </FormItem>
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
                    style="text-align: left; width: 100% !important"
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
                    style="text-align: left; width: 100% !important"
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
                <span style="font-size: 16px; font-weight: bold">
                  Resuelva la Suma {{ captcha.numeroa }} + {{ captcha.numerob }}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Digíte su respuesta" prop="repo_captcha">
                  <Input
                    v-model="reporte.repo_captcha"
                    @input="reporte.repo_captcha = parseInt($event)"
                  />
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
                  style="
                    font-size: 16px;
                    font-weight: 400;
                    background-color: #ffc400;
                  "
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
    <Modal v-model="showConfirmDialog" width="360">
      <p
        slot="header"
        style="font-size: 18px; color: #ffc400; text-align: center"
      >
        <Icon type="ios-information-circle"></Icon>
        <span>Reporte Creado</span>
      </p>
      <div
        style="
          text-align: center;
          font-size: 26px;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <p>
          Se ha creado el Reporte Caso No.
          <span style="font-weight: bold">{{ consecutivo }}</span>
          .
        </p>
        <p>Por favor guarde este número para consultas posteriores.</p>
      </div>
      <div slot="footer">
        <Button
          size="large"
          long
          @click="showConfirmDialog = false"
          style="background-color: #ffc400"
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
import Consulta from './Consulta.vue';
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
  components: {
    Consulta
  },
  props: {
    codigo: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters(['url'])
  },
  data() {
    return {
      reporte: {
        aap_id: null,
        repo_nombre: null,
        repo_direccion: null,
        repo_telefono: null,
        barr_id: null,
        repo_email: null,
        acti_id: null,
        repo_descripcion: null,
        repo_captcha: null,
        repo_fecharecepcion: null,
        empr_id: 1,
        token: '43f44388-5cd1-4657-9f7e-ea4e014e9333'
      },
      showConfirmDialog: false,
      consecutivo: null,
      barrios: [],
      actividades: [],
      ruleValidate: {
        repo_nombre: [
          {
            required: true,
            message: 'Debe diligenciar el nombre completo',
            trigger: 'blur'
          }
        ],
        repo_telefono: [
          {
            required: true,
            message: 'Debe diligenciar el teléfono',
            trigger: 'blur'
          }
        ],
        repo_email: [
          {
            required: true,
            message: 'Debe diligenciar el correo electrónico',
            trigger: 'blur'
          }
        ],
        repo_direccion: [
          {
            required: true,
            message: 'Debe diligenciar la dirección de la Luminaria',
            trigger: 'blur'
          }
        ],
        barr_id: [
          {
            required: true,
            type: 'number',
            message:
              'Debe seleccionar el barrio donde se encuentra la Luminaria',
            trigger: 'change'
          }
        ],
        acti_id: [
          {
            required: true,
            type: 'number',
            message: 'Debe seleccionar el daño que presenta la luminaria',
            trigger: 'change'
          }
        ],
        repo_descripcion: [
          {
            required: true,
            message: 'Debe describir el daño que presenta a luminaria',
            trigger: 'blur'
          }
        ],
        repo_captcha: [
          {
            required: true,
            type: 'number',
            message: 'Debe digitar su respuesta',
            trigger: 'blur'
          }
        ]
      },
      captcha: {
        numeroa: null,
        numerob: null,
        result: null
      },
      aap: null
    };
  },
  beforeMount() {
    this.getDataBarrio();
  },
  mounted() {
    this.captcha.numeroa = Math.floor(Math.random() * 10 + 1);
    this.captcha.numerob = Math.floor(Math.random() * 10 + 1);
    this.captcha.result = this.captcha.numeroa + this.captcha.numerob;
    console.log('codigo:', this.codigo);
  },
  methods: {
    validar(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.reporte.repo_captcha === this.captcha.result) {
            this.reporte.repo_fecharecepcion = moment(
              String(new Date())
            ).format('YYYY-MM-DD HH:mm:ss');
            this.$http
              .post(
                this.url + '/api/repo/grw',
                //"https://siap.iluminacionsanjuangiron.com/api/repo/grw",
                this.reporte
              )
              .then(response => {
                this.consecutivo = response.data.consec;
                this.showConfirmDialog = true;
                this.limpiar();
              });
          } else {
            this.$Message.error({
              content: 'La respuesta dada no es correcta!',
              duration: 5
            });
          }
        } else {
          this.$Message.error({
            content: 'Faltan datos por diligenciar en el formulario!',
            duration: 5
          });
        }
      });
    },
    getLuminaria() {
      if (this.codigo) {
        console.log('si existe codigo')
        this.$http
          .get(
            this.url +
              '/api/aap/gbc/' +
              //"https://siap.iluminacionsanjuangiron.com/api/aap/gbc/" +
              this.codigo +
              '/1/43f44388-5cd1-4657-9f7e-ea4e014e9333'
          )
          .then(response => {
            this.aap = response.data;
            this.reporte.aap_id = this.aap.aap_id;
            this.reporte.repo_direccion = this.aap.aap_direccion;
            this.reporte.barr_id = this.aap.barr_id;
          });
      }else{
        console.log('no existe codigo')
      }
    },
    getDataBarrio() {
      this.$http
        .get(
          this.url + '/api/barr/gbi/1/43f44388-5cd1-4657-9f7e-ea4e014e9333'
          //"https://siap.iluminacionsanjuangiron.com/api/barr/gbi/1/43f44388-5cd1-4657-9f7e-ea4e014e9333"
        )
        .then(response => {
          this.barrios = response.data;
          this.getDataAccion();
        });
    },
    getDataAccion() {
      this.$http
        .get(
          this.url + '/api/acti/gai/43f44388-5cd1-4657-9f7e-ea4e014e9333'
          //"https://siap.iluminacionsanjuangiron.com/api/acti/gai/43f44388-5cd1-4657-9f7e-ea4e014e9333"
        )
        .then(response => {
          this.actividades = response.data;
          this.getLuminaria();
        });
    },
    limpiar() {
      this.reporte = {
        repo_nombre: null,
        repo_direccion: null,
        repo_telefono: null,
        barr_id: null,
        repo_email: null,
        acti_id: null,
        repo_descripcion: null,
        repo_captcha: null,
        repo_fecharecepcion: null,
        empr_id: 1,
        token: '43f44388-5cd1-4657-9f7e-ea4e014e9333'
      };
      this.$refs['formValidate'].reset();
      this.reporte.empr_id = 1;
      this.reporte.token = '43f44388-5cd1-4657-9f7e-ea4e014e9333';
    }
  }
};
</script>
