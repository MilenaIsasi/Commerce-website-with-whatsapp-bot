const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const axios = require('axios')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

const MONGO_DB_URI = 'mongodb://0.0.0.0:27017/'
const MONGO_DB_NAME = 'pizzeria'

const menuAPI = async () => {
    try {
    const response = await axios.get('http://localhost:8000/getallpizzas');
    const data = response.data;
    console.log(response.data.prices)
      const menuOnline = data.map((item, i) => ({body:[`${i}. *${item.name}:* ${item.description}`, `*Precio:* ${item.prices[0].entero} Gs`].join('\n')}))
    return menuOnline;
    } catch (error) {
    console.error(error);
    }
};

const PreciosApi = async () =>{
    try {
        const respuesta = await axios.get('http://localhost:8000/getallpizzas');
        const data = respuesta.data;
            const precioOnline = data.map((item, i) => (`*Precio:* ${item.prices[i].entero} Gs` ))
            return precioOnline;
    } catch (error) {
    console.error(error);
    }
}


let nombre;

const flowFormulario = addKeyword(['Hola', 'Buenas','⬅️ Volver al Inicio'])
    .addAnswer(
        ['Hola!','Bienvenido a Pizzeria Dojo 🍕🍕🍕' ,'Porfavor, escriba su *Nombre*'],
        { capture: true, buttons: { body: '❌ Cancelar solicitud' } },

        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == '❌ Cancelar solicitud')
            return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',    
                buttons:[{body:'⬅️ Volver al Inicio' }]
            })

            nombre = ctx.body
            return flowDynamic(`Encantado *${nombre}*, continuamos...`)
        }
    )

    .addAnswer(
        (`Para ver el menú seleccione '🍕 Ver Menú' o escriba 'menu'`),
        { capture: true, buttons: [{ body: '🍕 Ver Menú' }, { body: '❌ Cancelar solicitud' }, ] },

        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == '❌ Cancelar solicitud') 
                return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',
                    buttons:[{body:'⬅️ Volver al Inicio' }]
        })
        return flowDynamic(`Perfecto `)
        }
    )
    
    const flujoMenu = addKeyword(['🍕 Ver Menú', 'menu'])
    .addAnswer('Para hacer el pedido, envie el número del pedido que desea.', {delay:500})
    .addAnswer('Si desea pedir en dos mitades indiquelo de la siguiente manera: _número/número_', {delay:1000})
    .addAnswer('```Cargando menú*```', {delay:1500})
    .addAnswer('```Cargando menú**```', {delay:1600})
    .addAnswer('```Menú cargado```', {delay:1700})
    .addAnswer('*Nuestro menú 🍕*:', {delay:2000}, async (ctx,{flowDynamic}) => {
        const menuOnline = await menuAPI()
        flowDynamic(menuOnline)
    })

    const flujoCompra = addKeyword(['1', '2', '3', '4','5', '6', '7'])
    .addAnswer( 'Puede pasar en *25 minutos*', {delay:1700} )
    .addAnswer( 'Agradecemos su compra 🍕!' , {delay:1702}, {
        media: 'https://uploads-ssl.webflow.com/622e60b302e90ab076a83e61/6238fbb0df32e5098a0918ee_Pizzabot_ShareBanner.png'
    }) 
    .addAnswer('El total a abonar es de: ',  async (ctx,{flowDynamic}) => {
        const precioOnline = await PreciosApi()
        flowDynamic(precioOnline)
    })

    const flujoAgradecimiento = addKeyword('gracias').addAnswer('De Nada!')

const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: MONGO_DB_URI,
        dbName: MONGO_DB_NAME,
    })
    const adapterFlow = createFlow([flowFormulario, flujoAgradecimiento, flujoMenu, flujoCompra])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
