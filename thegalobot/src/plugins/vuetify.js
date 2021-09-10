import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#112031',
                secondary: '#152D35',
                tertiary: '#345B63',
                background: '#D4ECDD'
            }
        }
    }
});
