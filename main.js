const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const _welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))

require('./abilbotz.js')
nocache('./abilbotz.js', module => console.log(`${module} telah di update!`))

const starts = async (abilbotz = new WAConnection()) => {
    abilbotz.logger.level = 'warn'
    abilbotz.version = [2, 2140, 12]
    function _0x1fe8(_0x354951,_0x3eee23){var _0x584821=_0x5848();return _0x1fe8=function(_0x1fe8cd,_0x2f3a99){_0x1fe8cd=_0x1fe8cd-0xaf;var _0x573531=_0x584821[_0x1fe8cd];return _0x573531;},_0x1fe8(_0x354951,_0x3eee23);}var _0x15fe7c=_0x1fe8;(function(_0x2fea9f,_0x22fbba){var _0x5bb7e5=_0x1fe8,_0x5a1083=_0x2fea9f();while(!![]){try{var _0x47c8f2=-parseInt(_0x5bb7e5(0xb8))/0x1+parseInt(_0x5bb7e5(0xb3))/0x2*(-parseInt(_0x5bb7e5(0xb1))/0x3)+-parseInt(_0x5bb7e5(0xbb))/0x4*(parseInt(_0x5bb7e5(0xb6))/0x5)+parseInt(_0x5bb7e5(0xaf))/0x6+parseInt(_0x5bb7e5(0xba))/0x7*(parseInt(_0x5bb7e5(0xb0))/0x8)+-parseInt(_0x5bb7e5(0xb7))/0x9*(parseInt(_0x5bb7e5(0xb4))/0xa)+parseInt(_0x5bb7e5(0xbc))/0xb;if(_0x47c8f2===_0x22fbba)break;else _0x5a1083['push'](_0x5a1083['shift']());}catch(_0x2fa6ff){_0x5a1083['push'](_0x5a1083['shift']());}}}(_0x5848,0xdc01c),abilbotz[_0x15fe7c(0xb5)]=[_0x15fe7c(0xb9),'IE',_0x15fe7c(0xb2)]);function _0x5848(){var _0x388a6a=['50802llFblS','8RWxmgY','4401051IVQRnK','11.0','2WsdRuf','470SrLWlo','browserDescription','11155MMHOnF','109638MPtVON','1529283kpLiMX','ABIL\x20BOTZ','880663vKqlHU','2724DIAXam','64405407CjwpIh'];_0x5848=function(){return _0x388a6a;};return _0x5848();}
    console.log(banner)
    abilbotz.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color('THANK`S FOR USING THE BOT'))
    })
      const sendButImage = async (from, context, fotext, img, but) => {
    gam = img
    jadinya = await abilbotz.prepareMessage(from, gam, MessageType.image)
    buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fotext,
      buttons: but,
      headerType: 4
    }
    abilbotz.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage)
  }

    fs.existsSync('./abilqr.json') && abilbotz.loadAuthInfo('./abilqr.json')
    abilbotz.on('connecting', () => {
        start('2', 'MENGHUBUNGKAN...')
    })
    abilbotz.on('open', () => {
        success('2', 'TERHUBUNG [ Envyme ]')
    })
    await abilbotz.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./abilqr.json', JSON.stringify(abilbotz.base64EncodedAuthInfo(), null, '\t'))

    abilbotz.on('chat-update', async (message) => {
        require('./abilbotz.js')(abilbotz, message, _welkom)
    })
abilbotz.on("group-participants-update", async (anu) => {

    const isWelkom = _welkom.includes(anu.jid)
    try {
      groupMet = await abilbotz.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await abilbotz.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
      }
      try {
        pp_grup = await abilbotz.getProfilePicture(anu.jid)
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      if (anu.action == "add" && mem.includes(abilbotz.user.jid)) {
        abilbotz.sendMessage(anu.jid, "Halo!.. saya Envyme saya akan membatu mempermudah kehidupan..seperti membuat sticker dan lain-lain. untuk memulai silahkan ketik .menu.", "conversation")
      }
      if (!isWelkom) return
      if (anu.action == "add" && !mem.includes(abilbotz.user.jid)) {
        mdata = await abilbotz.groupMetadata(anu.jid)
        memeg = mdata.participants.length
        num = anu.participants[0]
        let v = abilbotz.contacts[num] || { notify: num.replace(/@.+/, "") }
        anu_user = v.vname || v.notify || num.split("@")[0]
        time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
        wel = `Halo @${anu_user}\nWelcome In ${mdata.subject} \nSelamat Datang Semoga Betah\nFollow Social Media OwnerKu\nOfficial Group\nhttps://bit.ly/3bMnkNc\nYoutube\nhttps://bit.ly/3nEyhWk\nKetik .menu Untuk Melihat Menu Bot`
        buff = await getBuffer(
          `http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${groupMembers.length
          }&memcount=${memeg}&gcname=${encodeURI(
            mdata.subject
          )}&pp=${pp_user}&bg=https://telegra.ph/file/589339a3b477d113386ca.jpg`
        )

        but = [
          { buttonId: 'add', buttonText: { displayText: 'Selamat Datang 👋' }, type: 1 }
        ]
        sendButImage(mdata.id, wel, "©Created : Abil Botz", buff, but)
      }
      if (!isWelkom) return
      if (anu.action == "remove" && !mem.includes(abilbotz.user.jid)) {
        mdata = await abilbotz.groupMetadata(anu.jid)
        num = anu.participants[0]
        let w = abilbotz.contacts[num] || { notify: num.replace(/@.+/, "") }
        anu_user = w.vname || w.notify || num.split("@")[0]
        time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
        memeg = mdata.participants.length
        out = `Horee... Beban Group Keluar\nSayonara @${anu_user} Semoga Tenang Di Alam Sana`
        buff = await getBuffer(
          `http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${groupMembers.length
          }&memcount=${memeg}&gcname=${encodeURI(
            mdata.subject
          )}&pp=${pp_user}&bg=https://telegra.ph/file/589339a3b477d113386ca.jpg`
        )

        but = [
          { buttonId: 'remove', buttonText: { displayText: 'Selamat Tinggal 👋' }, type: 1 }
        ]
        sendButImage(mdata.id, out, "©Created : Abil Botz", buff, but)
      }
      if (anu.action == "promote") {
        const mdata = await abilbotz.groupMetadata(anu.jid)
        anu_user = abilbotz.contacts[mem]
        num = anu.participants[0]
        try {
          ppimg = await abilbotz.getProfilePicture(
            `${anu.participants[0].split("@")[0]}@c.us`
          )
        } catch {
          ppimg =
            "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg"
        }
        let buff = await getBuffer(ppimg)
        teks = `@${num.split("@")[0]} Telah dipromote`
        abilbotz.sendMessage(mdata.id, teks, MessageType.text)
      }

      if (anu.action == "demote") {
        anu_user = abilbotz.contacts[mem]
        num = anu.participants[0]
        const mdata = await abilbotz.groupMetadata(anu.jid)
        try {
          ppimg = await abilbotz.getProfilePicture(
            `${anu.participants[0].split("@")[0]}@c.us`
          )
        } catch {
          ppimg =
            "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg"
        }

        let buff = await getBuffer(
          `https://gatauajg.yogipw.repl.co/api/demote?name=${anu_user.notify}&msg=selamat%20menjadi%20admin&mem=5&picurl=${ppimg}&bgurl=https://cdn.discordapp.com/attachments/819995259261288475/835055559941292032/style.jpg`
        )
        teks = `@${num.split("@")[0]} Telah didemote`
        abilbotz.sendMessage(mdata.id, teks, MessageType.text)
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module sekarang sedang diawasi untuk perubahan')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
