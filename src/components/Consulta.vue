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
                v-model="consulta.repo_consecutivo"
                placeholder="Número Radicado"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <Button
              style="font-size: 16px; font-weight: 400; background-color: #FFC400;"
              @click="validar('formValidate')"
            >
              Consultar
            </Button>
          </Col>
        </Row>
      </Form>
    </Content>
  </Layout>
</template>
<script>
export default {
  el: "Consulta",
  data() {
    return {
      consulta: {
        repo_consecutivo: null
      },
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
        repo_consecutivo: [
          {
            required: true,
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
          console.log("Enviar Datos");
        } else {
          this.$Message.error({
            content: "Por favor ingrese el número de radicado!",
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
