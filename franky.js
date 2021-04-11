//Thanks For Mhankbarbar
//FrankyGanz no debat :v
//bug eror? chat me!

const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")
const { color, bgcolor } = require('./lib/color')
const { help } = require('./lib/help')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const imageToBase64 = require('image-to-base64');
const { removeBackgroundFromImageFile } = require('remove.bg')
const { virtex } = require('./src/virtex')
const { sendvir1 } = require('./src/sendvir1')
const { sendvir2 } = require('./src/sendvir2')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setiker = JSON.parse(fs.readFileSync('./src/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./src/video.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./src/image.json'))
const { spawn, exec, execSync } = require("child_process")
const speed = require('performance-now')
//const speedTest = require('@lh2020/speedtest-net');
const { Utils_1 } = require('./node_modules/@adiwajshing/baileys/lib/WAConnection/Utils')
//Apikey 
const vhtearkey = 'MASUKIN_APIKEY'  // beli di :  vhtear.com
const onlydevkey = 'MASUKIN_APIKEY' // beli di : onlydevcity.herokuapp.com
const tobzkey 'MASUKIN_APIKEY' // di bot tobz/elaina bot 
///payment
const nomer = '083183586629'
//yak
publik = false
prefix = 'z'
fake = '*SELF-KY*'
numbernye = '0'
targetprivate = '6283183586629'
ghoibsu = 'tes'
myteks = 'okeh nyala'
blocked = []
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const bulan = arrayBulan[moment().format('MM') - 1]

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);

	//return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
	return `${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`
}

function waktu(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

///login
const frnky = new WAConnection()
frnky.on('qr', qr => {
	qrcode.generate(qr, { small: true })
	console.log(`[ ${time} ] SCAN QR`)
})
frnky.on('credentials-updated', () => {
	const authInfo = frnky.base64EncodedAuthInfo()
	console.log(`FrankyGanz Update!`)
	fs.writeFileSync('./franky.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./franky.json') && frnky.loadAuthInfo('./franky.json')
frnky.connect();


///group
frnky.on('group-participants-update', async (anu) => {
	if (!welkom.includes(anu.jid)) return
	try {
		const mdata = await frnky.groupMetadata(anu.jid)
		console.log(anu)
		if (anu.action == 'add') {
			num = anu.participants[0]
			try {
				ppimg = await frnky.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
			} catch {
				ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			}
			teks = `Hallo @${num.split('@')[0]}\Welcome to group ${mdata.subject} Jangan lupa intro kau!...Betah-betah yah di sini🖤`
			let buff = await getBuffer(ppimg)
			frnky.sendMessage(mdata.id, teks, MessageType.text)
		} else if (anu.action == 'remove') {
			num = anu.participants[0]
			try {
				ppimg = await frnky.getProfilePicture(`${num.split('@')[0]}@c.us`)
			} catch {
				ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			}
			teks = `Sayonara🥳 @${num.split('@')[0]} .`
			let buff = await getBuffer(ppimg)
			frnky.sendMessage(mdata.id, teks, MessageType.text)
		}
	} catch (e) {
		console.log('Error : %s', color(e, 'red'))
	}
})

//
frnky.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
		blocked.push(i.replace('c.us', 's.whatsapp.net'))
	}
})

frnky.on('message-update', async (hurtz) => {
	try {
		const from = hurtz.key.remoteJid
		const messageStubType = WA_MESSAGE_STUB_TYPES[hurtz.messageStubType] || 'MESSAGE'
		const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
		const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
		const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
		const sender = hurtz.key.fromMe ? frnky.user.jid : hurtz.key.remoteJid.endsWith('@g.us') ? hurtz.participant : hurtz.key.remoteJid
		const isRevoke = hurtz.key.remoteJid.endsWith('@s.whatsapp.net') ? true : hurtz.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
		const isCtRevoke = hurtz.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
		const isBanCtRevoke = hurtz.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
		if (messageStubType == 'REVOKE') {
			console.log(`Status untuk grup : ${!isRevoke}\nStatus semua kontak : ${!isCtRevoke}\nStatus kontak dikecualikan : ${!isBanCtRevoke}`)
			if (!isRevoke) return
			if (!isCtRevoke) return
			if (!isBanCtRevoke) return
			const from = hurtz.key.remoteJid
			const isGroup = hurtz.key.remoteJid.endsWith('@g.us') ? true : false
			let int
			let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
			const id_deleted = hurtz.key.id
			const conts = hurtz.key.fromMe ? frnky.user.jid : frnky.contacts[sender] || { notify: jid.replace(/@.+/, '') }
			const pushname = hurtz.key.fromMe ? frnky.user.name : conts.notify || conts.vname || conts.name || '-'
			const opt4tag = {
				contextInfo: { mentionedJid: [sender] }
			}
			for (let i = 0; i < infoMSG.length; i++) {
				if (infoMSG[i].key.id == id_deleted) {
					const dataInfo = infoMSG[i]
					const type = Object.keys(infoMSG[i].message)[0]
					const timestamp = infoMSG[i].messageTimestamp
					int = {
						no: i,
						type: type,
						timestamp: timestamp,
						data: dataInfo
					}
				}
			}
			const index = Number(int.no)
			const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
			const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
			var itsme = `${numbernye}@s.whatsapp.net`
				var split = `hayo apanya tuh yg di hapus?,kwkw`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot72 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
			if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
				const strConversation = `「 *ANTI-DELETE* 」

*Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
*Tipe :* Text
*Pesan :* ${body ? body : '-'}
`
				frnky.sendMessage(from, strConversation, MessageType.text, selepbot72)
			} else if (int.type == 'stickerMessage') {
				var itsme = `${numbernye}@s.whatsapp.net`
					var split = `hayo apanya tuh yg di hapus?,kwkw`
					const pingbro23 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await frnky.downloadAndSaveMediaMessage(int.data, `./antidelete/sticker/${filename}`);
				const strConversation = `「 *ANTI-DELETE* 」

Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
Tipe :* Sticker
`

				const buff = fs.readFileSync(savedFilename)
				frnky.sendMessage(from, strConversation, MessageType.text, opt4tag)
				frnky.sendMessage(from, buff, MessageType.sticker, pingbro23)
				// console.log(stdout)
				fs.unlinkSync(savedFilename)

			} else if (int.type == 'imageMessage') {
				var itsme = `${numbernye}@s.whatsapp.net`
					var split = `hayo apanya tuh yg di hapus?,kwkw`
					const pingbro22 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await frnky.downloadAndSaveMediaMessage(int.data, `./antidelete/image/${filename}`);
				const buff = fs.readFileSync(savedFilename)
				const strConversation = `「 *ANTI-DELETE* 」

*Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
*Tipe :* Image
*Pesan :* ${body ? body : '-'}\`\`\`
`
				frnky.sendMessage(from, buff, MessageType.image, { contextInfo: { mentionedJid: [sender] }, caption: strConversation })
				fs.unlinkSync(savedFilename)
			}
		}
	} catch (e) {
		console.log('Message : %s', color(e, 'green'))
		// console.log(e)
	}
})

frnky.on('message-new', async (mek) => {
	try {
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
		infoMSG.push(JSON.parse(JSON.stringify(mek)))
		fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
		const urutan_pesan = infoMSG.length
		if (urutan_pesan === 5000) {
			infoMSG.splice(0, 4300)
			fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
		}
		if (!publik) {
			if (!mek.key.fromMe) return
		}
		global.prefix
		global.blocked
		const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const type = Object.keys(mek.message)[0]
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		

		mess = {
			wait: 'wait 🏃‍♂️',
			success: 'Berhasil!',
			error: {
				stick: 'Itu video gblk!',
				Iv: 'Linknya mokad:v'
			},
			only: {
				group: 'Grup only bruh...',
				ownerG: 'Owner grup only bruh...',
				ownerB: 'Lu siapa?',
				admin: 'Mimin grup only bruh...',
				Badmin: 'Jadiin gw admin dlu su!'
			}
		}

		const botNumber = frnky.user.jid
		const ownerNumber = ["6283183586629@s.whatsapp.net"] // GANTI JADI NO LU
		const isGroup = from.endsWith('@g.us')
		const sender = isGroup ? mek.participant : mek.key.remoteJid
		const totalchat = await frnky.chats.all()
		const groupMetadata = isGroup ? await frnky.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const isWelkom = isGroup ? welkom.includes(from) : false
		const isNsfw = isGroup ? nsfw.includes(from) : false
		const isSimi = isGroup ? samih.includes(from) : false
		const isOwner = ownerNumber.includes(sender)
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
		}
		const reply = (teks) => {
			frnky.sendMessage(from, teks, text, { quoted: mek })
		}
		const sendMess = (hehe, teks) => {
			frnky.sendMessage(hehe, teks, text)
		}
///Fake
		const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "SELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
		const runsu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "RUNTIME\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
		const frankysu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_IMAGE_\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/frankyimage.jpeg')} } }
		const pingsu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "SPEED\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
		const ceksu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "TOTAL-CHAT\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const waitsu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "Proses.....\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/wait.jpeg')} } }
        const downloadsu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "DOWNLOADER\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const voicesu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "VOICE\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const nsfwsu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "NSFW\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const animesu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "ANIME\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const mediasu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "MEDIA\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const makersu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "MAKER\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        const funsu = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "FUN\nSELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }
        
		const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? frnky.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : frnky.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
		}
///color
		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
//convert
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
//pesan pribadi
		if (!isGroup && isCmd) console.log('', '[\x1b[1;32mCOMMAND\x1b[1;37m]', time, color(command), 'DARI', color(sender.split('@')[0]), 'args :', color(args.length))
		if (!isGroup && !isCmd) console.log('', '[\x1b[1;32mPESAN\x1b[1;37m]', time, color('pesan'), 'DARI', color(sender.split('@')[0]), 'args :', color(args.length))
///pesan group
		if (isCmd && isGroup) console.log('', '[\x1b[1;32mCOMMAND\x1b[1;37m]', time, color(command), 'DARI', color(sender.split('@')[0]), 'GC', color(groupName), 'args :', color(args.length))
		if (!isCmd && isGroup) console.log('', '[\x1b[1;32mPESAN\x1b[1;37m]', time, color('pesan'), 'DARI', color(sender.split('@')[0]), 'GC', color(groupName), 'args :', color(args.length))
		switch (command) {
			///GROUP
			case 'hidetag1':
			case 'hidetag':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbotty = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				{
					members_id = []
					teks = (args.length > 1) ? body.slice(9).trim() : `${body.slice(8)}`
					for (let mem of groupMembers) {
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true, MessageType.text, selepbotty)
				}
				break
               ///MEDIA
				case 'trendtwit':
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Hastag* : ${i.hastag}\n*link* : ${i.link}\n*rank* : ${i.rank}\n*Tweet* : ${i.tweet}\n=================\n`
					}
					reply(teks.trim())
					break
          ///ANIME
			case 'shota':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				{
					var items = ['shota anime', 'anime shota'];
					var nime = items[Math.floor(Math.random() * items.length)];
					var url = "https://api.fdci.se/rep.php?gambar=" + nime;

					axios.get(url)
						.then((result) => {
							var n = JSON.parse(JSON.stringify(result.data));
							var nimek = n[Math.floor(Math.random() * n.length)];
							imageToBase64(nimek)
								.then(
									(response) => {
										var buf = Buffer.from(response, 'base64');
										frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
										frnky.sendMessage(from, buf, MessageType.image, { caption: `SHOTA!`, quoted: mek })

									}
								)
								.catch(
									(error) => {
										console.log(error);
									}
								)

						});
				}
				break
            ///GROUP
			case 'hidetag2':
				var value = text.replace(text.split(' ')[0], `${body.slice(9)}`)
				var group = await frnky.groupMetadata(jid)
				var member = group['participants']
				var ids = []
				member.map(async adm => {
					ids.push(adm.jid.replace('c.us', 's.whatsapp.net'))
				})
				var optionsss = {
					text: value,
					contextInfo: { mentionedJid: ids },
					quoted: m
				}
				frnky.sendMessage(jid, optionsss, MessageType.text)
				break
         ///MEDIA
			case 'brainly':
				var teks = body.slice(9)
				axios.get(`https://api.vhtear.com/branly?query=${teks}&apikey=${vhtearkey}`).then((res) => {
					let hasil = ` ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ${res.data.result.data}`;
					frnky.sendMessage(from, hasil, MessageType.text, { quoted: mek });
				})
				break
          ///GROUP
			case 'group':
			case 'grup':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const groupp = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (!isGroup) return reply(mess.only.group)
				if (args[0] === 'open') {
					frnky.sendMessage(from, `*「 SUCCES OPEN GRUP 」*`, MessageType.text, groupp)
					frnky.groupSettingChange(from, GroupSettingChange.messageSend, false)
				} else if (args[0] === 'close') {
					await frnky.groupSettingChange(from, GroupSettingChange.messageSend, true)
					frnky.sendMessage(from, `*「 SUCCES CLOSE GRUP 」*`, MessageType.text, groupp)
				}
                                break

             ///NYOBA AJ :V
            case 'spamcall':
          reply('Bentar Brader')
                                       if (args[0].startsWith('8')) return reply('Gunakan nomor awalan 8/n ex : *8318358*')
                                       data = body.slice(10)
                                       anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/spamcall?no=${data}`, {method: 'get'})
				                       if (anu.error) return reply(anu.error)
				                       jahatsu = `${anu.logs}`
                                       frnky.sendMessage(from, jahatsu, MessageType.text, { quoted: freply})
                                       break
         ///MEDIA
			case 'wiki':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `WIKI`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const wimki = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				var teks = body.slice(6)
				axios.get(`https://alfians-api.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
					frnky.sendMessage(from, '[ WAIT ] Searching...⏳ silahkan tunggu', MessageType.text, wimki)
					let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
					frnky.sendMessage(from, hasil, MessageType.text, wimki);
				})
				break
          ///GROUP
			case 'gcname':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const gcname = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				await frnky.groupUpdateSubject(from, `${body.slice(8)}`)
				frnky.sendMessage(from, `*「 CHANGE TO ${body.slice(8)} 」*`, MessageType.text, gcname)
				break
         ///GROUP
			case 'gcdesk':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const gcdesk = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				await frnky.groupUpdateDescription(from, `${body.slice(8)}`)
				frnky.sendMessage(from, `*「 CHANGE TO ${body.slice(8)} 」*`, MessageType.text, gcdesk)
				break
         ///MAKER
             case 'epep':
					if (args.length < 1) return reply(mess.blank)
					tels = body.slice(8)
					if (tels.ength > 15) return reply('Teksnya kepanjangan, maksimal 20 karakter')
					anu = await fetchJson(`https://api.vhtear.com/logoff?hero=alok&text=${tels}&apikey=${vhtearkey}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					 frnky.sendMessage(from, buffer, image, {quoted: mek})
					break 
	        ///MEDIA
			case 'tinyurl':
				const tinyurl = body.slice(9)
				axios.get(`https://tobz-api.herokuapp.com/api/tinyurl?url=${tinyurl}&apikey=${tobzkey}`).then((res) => {
					let hasil = `${res.data.result}`;
					frnky.sendMessage(from, hasil, MessageType.text, freply)
				})
				break
			   case 'bitly':
			    bitly = body.slice(6)
			    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${bitly}&apikey=${tobzkey}`, { method: 'get' })
			    buffer = await getBuffer(anu.result)
			    frnky.sendMessage(from, buffer, MessageType.text, {quoted: mek})
				break

               case 'mediafire':
				const mediafire = body.slice(10)
				axios.get(`https://docs-jojo.herokuapp.com/api/mediafire?url=${mediafire}`).then((res) => {
					let hasil = `${res.data.url}`;
					frnky.sendMessage(from, hasil, MessageType.text, freply)
				})
				break
       ///FUN
            case 'rate':
            case 'nilai':
					rate = body.slice(1)
					const ra =['0','4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					frnky.sendMessage(from, '❏Pertanyaan : *'+rate+'*\n❏Jawaban : '+ te+'%', text, { quoted: freply})
					break
///KODE BHS
case 'kodebhs':
frnky.sendMessage(from, `
  KODE | BAHASA
 ❏  af : Afrikaans
 ❏  sq: Albanian
 ❏  ar: Arabic
 ❏  hy: Armenian
 ❏  ca: Catalan
 ❏  zh: Chinese
 ❏  hr: Croatian
 ❏  cs: Czech
 ❏  da: Danish
 ❏  nl: Dutch
 ❏  en: English
 ❏  eo: Esperanto
 ❏  fi: Finnish
 ❏  fr: French
 ❏  de: German
 ❏  el: Greek
 ❏  ht: Haitian Creole
 ❏  hi: Hindi
 ❏  hu: Hungarian
 ❏  is: Icelandic
 ❏  id: Indonesian
 ❏  it: Italian
 ❏  ja: Japanese
 ❏  ko: Korean
 ❏  la: Latin
 ❏  lv: Latvian
 ❏  mk: Macedonian
 ❏  no: Norwegian
 ❏  pl: Polish
 ❏  pt: Portuguese
 ❏  ro: Romanian
 ❏  ru: Russian
 ❏  sr: Serbian
 ❏  sk: Slovak
 ❏  es: Spanish
 ❏  sw: Swahili
 ❏  sv: Swedish
 ❏  ta: Tamil
 ❏  th: Thai
 ❏  tr: Turkish
 ❏  vi: Vietnamese
 ❏  cy: Welsh
 ❏ NIH GW NYALIN YE :V

SELF-KY`, MessageType.text, {quoted: freply})
break
          ///INFO
			case 'runtime':
				runtime = process.uptime()
				teks = `${kyun(runtime)}`
				
				frnky.sendMessage(from, `${teks}`, text, { quoted: runsu})
				break
         ///DOWNLOAD
			case 'joox':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `JOOX`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=${tobzkey}`, { method: 'get' })
				teks = '-「 Play Music From Joox 」-\n'
				const joox = data.result
				teks += `\n- Judul : ${joox.title}\n- Album : ${joox.album}\n- Publish At : ${joox.dipublikasi}\n\n-「 F-BOT」-`
				thumb = await getBuffer(joox.thumb)
				frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
				frnky.sendMessage(from, thumb, image, { quoted: mek, caption: teks })
				buffer = await getBuffer(joox.mp3)
				frnky.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', filename: `${joox.title}.mp3`, quoted: mek })
				break
         ///MENUNYA SU
case 'download':
frnky.sendMessage(from, `
 ❏  DOWNLOADER

❏ ${prefix}play [optional]
❏ ${prefix}ytmp3 [linkYT]
❏ ${prefix}ytmp4 [linkYT]
❏ ${prefix}tiktoknowm [linkTT] 
❏ ${prefix}film [optional]
❏ ${prefix}igdl [linkIG] 
❏ ${prefix}igtv [linkIG] 
❏ ${prefix}fb [linkFB] 
❏ ${prefix}tiktok [linkTT]
❏ ${prefix}joox [optional]

SELF-KY`, MessageType.text, {quoted: downloadsu})
					break
case 'nsfw':
frnky.sendMessage(from, `
❏ NSFW

❏ ${prefix}randomhentai
❏ ${prefix}xxx [optional]
❏ ${prefix}bokep
❏ ${prefix}nsfwtrap
❏ ${prefix}nsfwneko
❏ ${prefix}nsfwblowjob
❏ ${prefix}hot 1-25 [pilih aja]

SELF-KY`, MessageType.text, {quoted: nsfwsu})
					break
case 'anime':
frnky.sendMessage(from, `
❏ ANIME

❏ ${prefix}shota
❏ ${prefix}loli
❏ ${prefix}animehuggif
❏ ${prefix}waifu
❏ ${prefix}neko
❏ ${prefix}wait [tag]

SELF-KY`, MessageType.text, {quoted: animesu})
					break
case 'media':
frnky.sendMessage(from, `
❏ MEDIA

❏ ${prefix}trendtwit
❏ ${prefix}brainly [optional]
❏ ${prefix}wiki
❏ ${prefix}tinyurl
❏ ${prefix}pinterest [optional]
❏ ${prefix}image [optional]
❏ ${prefix}lirik [nama lagu]
❏ ${prefix}tiktokstalk [username]
❏ ${prefix}igstalk [username]
❏ ${prefix}ytsearch [query]
❏ ${prefix}kbbi

SELF-KY`, MessageType.text, {quoted: mediasu})
					break
					case 'other':
					frnky.sendMessage(from, other(prefix), text, { quoted: freply})
					break
                     case 'group':
					frnky.sendMessage(from, group(prefix), text, { quoted: freply})
					break
                     case 'fun':
frnky.sendMessage(from, `
❏  FUN

❏ ${prefix}katagw
❏ ${prefix}pantun
❏ ${prefix}hilih [teks]
❏ ${prefix}alay [teks]
❏ ${prefix}rate
❏ ${prefix}quotes
❏ ${prefix}dare
❏ ${prefix}truth
❏ ${prefix}tts [kode bhs]
❏ ${prefix}caklongtong 
❏ ${prefix}tebakgambar 
❏ ${prefix}family100

SELF-KY`, MessageType.text, {quoted: funsu})
					break
case 'maker':
frnky.sendMessage(from, `
❏  MAKER

❏ ${prefix}galaxtext [teks]
❏ ${prefix}gembok [teks]
❏ ${prefix}coffeteks [teks]
❏ ${prefix}party [teks]
❏ ${prefix}ffbanner [teks]
❏ ${prefix}blackpink [teks]
❏ ${prefix}lovemake [teks]
❏ ${prefix}thunder [teks]
❏ ${prefix}tahta [teks]
❏ ${prefix}pornlogo [teks|teks]
❏ ${prefix}logml [teks]
❏ ${prefix}mlogo [teks]
❏ ${prefix}quotemaker [teks|teks]
❏ ${prefix}rteks [teks]
❏ ${prefix}nulis [nama/kelas/isinye]
❏ ${prefix}ultah [teks]
❏ ${prefix}metalteks [teks]
❏ ${prefix}logopubg [teks|teks]
❏ ${prefix}apiteks [teks]
❏ ${prefix}asap [teks]
❏ ${prefix}silkteks [teks]
❏ ${prefix}glowing [teks]
❏ ${prefix}airteks [teks]
❏ ${prefix}gula [teks]
❏ ${prefix}glitch [teks|teks]
❏ ${prefix}glow [teks]
❏ ${prefix}neon [teks]
❏ ${prefix}textlight [teks]
❏ ${prefix}bittext [teks|teks]
❏ ${prefix}hilih [teks]
❏ ${prefix}ocr [tag/krim gmbar]
❏ ${prefix}toimg [tag sticker]
❏ ${prefix}sticker [tag/krim gmbar]
 ❏ TANPA TANDA [ ]

SELF-KY`, MessageType.text, {quoted: makersu})
					break
case 'voice':
frnky.sendMessage(from, `
❏ VOICE

❏ ${prefix}bass
❏ ${prefix}slow
❏ ${prefix}toptt
❏ ${prefix}serem
❏ ${prefix}aneh
❏ ${prefix}nightcore
❏ ${prefix}tupai
❏ ${prefix}gemuk

SELF-KY`, MessageType.text, {quoted: voicesu})
    break
       ///DOWNLOAD
			case 'play':
				
				data = await fetchJson(`https://api.vhtear.com/ytmp3?query=${body.slice(6)}&apikey=${vhtearkey}`, { method: 'get' })
				teks = '-[PLAY]-\n'
				const play = data.result
				teks += `\n- Judul : ${play.title}\n- Durasi : ${play.duration}\n- Size : ${play.size}\n- Link : ${play.url}\n\nSedang mengirim......`
				thumb = await getBuffer(play.image)
				frnky.sendMessage(from, `${teks}`, text, { quoted: waitsu})
				buffer = await getBuffer(play.mp3)
				frnky.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', filename: `${play.title}.mp3`, quoted: freply})
				break
           ///MEDIA
			case 'pinterest':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `PINTEREST`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				const papapale = body.slice(11)
				data = await fetchJson(`https://api.vhtear.com/pinterest?query=${body.slice(11)}&apikey=${vhtearkey}`, { method: 'get' })
				if (data.error) return reply(data.error)
				for (let i of data.result) {
					const amsulah = data.result
					const pimterest = amsulah[Math.floor(Math.random() * amsulah.length)]
					thumb = await getBuffer(pimterest)
				}
				frnky.sendMessage(from, `wait🏃‍♂️`, text, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "*Pinterest🗿*", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIADoAUQMBIgACEQEDEQH/xAAsAAEAAwEBAQAAAAAAAAAAAAAAAgMFBAYBAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAADwYAAAAAEo2EoeggYctbsPMX7XIZPycABZWNvLoHTfnjTo4x0c4AAAAAAAf//EAC0QAAMAAgEDAwIDCQAAAAAAAAECAwQRAAUSMRMhImGSFCCRJEBBQlBRUmOx/9oACAEBAAE/AP3dFLsqjW2IA2QB+p5PHvUoJxdy7FU7VJ7iPcgcM6AMxRtKwVjrwT4B4Y2Hdub/ABRXb28K2tE/Q74+Nead7yZV+BHcNbDglSPodcKsp0wIOgf14mLeisyKCFAJII/ipf8A4vCrKFJBAYbH1Hj8kXWdFdpJUD+RywB+0g8z8N4dXtiQgHxlo5STuyy2qbbmXTHxhjt2SZ6I4yISuzy/17IZudWImmKoT0bvH9pkHc+DpAQxbma/bTqUE2hwEAlUO/eQjiXMARsnTUvAX/EZxgS7vtUQIAF03OjXcdSxJnbLS0kPzddbPbsFCOUFQQKBge1dBv8AEjY/JJ1m4ZpJQDfwbYB+0g8yOvXybpZ8eHm21AfTesgRuXrOpUpjzj9ELnf3luWyTe+Tek0L2ZmPkBSx3teX6lW4uTKS0v7Wou9v7huY/VDj+l24sG9K5vLff8GOv7NzEy/wl43WEneWivd3a7g2w3sRzKyGybeqyKnwRAq70AihB5/on//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AR//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AR//Z", "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==" } } } })
				frnky.sendMessage(from, thumb, image, { quoted: mek, caption: `- Pinterest : ` + papapale })
				break
        ///OTHER
             case 'public':
             publik = true
             reply('STATUS : PUBLIC')
             break
             case 'self':
             publik = false
             reply('STATUS : SELF')
             break
             ///VOICE
             case 'gemuk':
	                 if (!isQuotedAudio) return reply('reply audio nya!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "SELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} }} })
						fs.unlinkSync(ran)
					    })
				        break
		     ///VOICE
				case 'slow':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
     case 'nightcore':
	                 if (!isQuotedAudio) return reply('reply audio nya!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:false, quoted: mek,duration:99999999999999999999999})
						fs.unlinkSync(ran)
					   })
				       break 
		case 'tupai':
	                 if (!isQuotedAudio) return reply('reply audio nya!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "SELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} }} })
						fs.unlinkSync(ran)
					    })
				       break
        case 'aneh':
	                 if (!isQuotedAudio) return reply('reply audio nya!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "SELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} }} })
						fs.unlinkSync(ran)
					    })
				        break
          case 'serem':
	                 if (!isQuotedAudio) return reply('reply audio nya!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=3486" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "SELF-KY", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} }} })
						fs.unlinkSync(ran)
					    })
				       break
           case 'toptt':
	                 if (!isQuotedAudio) return reply('reply audio nya!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('eror')
						topt = fs.readFileSync(ran)
						frnky.sendMessage(from, topt, audio, {mimetype: 'audio/mp4',  quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "@Franky", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('FrankyGanz/franky.jpeg')} } }, ptt:true})
						})
					    break
case 'tebakgambar':
					anu = await fetchJson(`https://api.vhtear.com/tebakgambar&apikey=${vhtearkey}`, {method: 'get'})
					bufferkkk = await getBuffer(anu.result.soalImg)
					setTimeout( () => {
					frnky.sendMessage(from, '* Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, '_10 Detik lagi_�', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, '_20 Detik lagi_�', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, bufferkkk, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
                case 'caklontong':
					anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=${vhtearkey}`, {method: 'get'})
					setTimeout( () => {
					frnky.sendMessage(from, '* Jawaban :* '+anu.result.jawaban+'\n'+anu.result.desk, text, {quoted: mek}) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, '_10 Detik lagi_�', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, '_20 Detik lagi_�', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, anu.result.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
				case 'family100':
					anu = await fetchJson(`https://api.vhtear.com/family100&apikey=${vhtearkey}`, {method: 'get'})
                    setTimeout( () => {
					frnky.sendMessage(from, '* Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, '_10 Detik lagi_�', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, '_20 Detik lagi_�', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					frnky.sendMessage(from, anu.result.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
       ///DOWNLOAD
			case 'ytmp4':
			
				if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('url nya tidak valid njerr🗿')				
		anu = await fetchJson(`https://api.vhtear.com/ytdl?link=${args[0]}&apikey=${vhtearkey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*• Judul* : ${anu.result.title}\n\n*_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_*`
					thumb = await getBuffer(anu.result.imgUrl)
					frnky.sendMessage(from, `${teks}`, text, { quoted: waitsu})
					buffer = await getBuffer(anu.result.UrlVideo)
					frnky.sendMessage(from, buffer, video, {mimetype: 'video/mp4', quoted: freply})
					break
           case 'ytmp3':
				data = await fetchJson(`https://api.vhtear.com/ytmp3?query=${body.slice(6)}&apikey=${vhtearkey}`, { method: 'get' })
				teks = '[YOUTUBE MP3]\n'
				const ytmp3 = data.result
				teks += `\n- Judul : ${ytmp3.title}\n- Durasi : ${ytmp3.duration}\n- Size : ${ytmp3.size}\n\n-Sedang mengirim lagunya.....`
				thumb = await getBuffer(ytmp3.image)
				frnky.sendMessage(from, `${teks}`, text, { quoted: waitsu})
				buffer = await getBuffer(ytmp3.mp3)
				frnky.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', filename: `${ytmp3.title}.mp3`, quoted: freply})
				break
         ///MAKER
         case 'textlight':
				if (args.length < 1) return reply('Teksnya mana?')
				ligh = body.slice(11)
				if (ligh.length > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
				lawak = await getBuffer(`https://api.zeks.xyz/api/tlight?text=${ligh}&apikey=apivinz`)
		    frnky.sendMessage(from, lawak, image, {quoted: mek})
		    break
          ///MEDIA
               case 'image':
          
					if (args.length < 1) return reply('apa yg mau di cari njerr?')
					goo = body.slice(7)
					anu = await fetchJson(`https://api.vhtear.com/googleimg?query=${goo}&apikey=${vhtearkey}`, {method: 'get'})
				    var pol = JSON.parse(JSON.stringify(anu.result.result_search));
                    var tes2 =  pol[Math.floor(Math.random() * pol.length)];
					pint = await getBuffer(tes2)
					frnky.sendMessage(from, pint, image, { caption: '*image*\n\n*Hasil Pencarian : '+goo+'*', quoted: freply})
					break
             ///ANTARA MEME ATAU DRAK JOKES :V
              case 'meme':
				 data = fs.readFileSync('./frangky/meme.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 darkjokes = await getBuffer(randKey.result)
                 frnky.sendMessage(from, darkjokes, image, {quoted: mek, caption: '\`\`\`MEME:V\`\`\`'})
				break
               ///MEDIA
             case 'lirik':
					teks = body.slice(7)
					anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${teks}`, {method: 'get'})
					reply('Lirik dari lagu '+teks+' adalah :\n\n'+anu.result.lirik)
					break
              ///MAKER
              case 'metalteks':
					if (args.length < 1) return reply('Teksnya mana um')
					love = body.slice(10)
					if (love.length > 12) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					bufferxcz = await getBuffer(`https://api.vhtear.com/metal_maker?text=${love}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, bufferxcz, image, {quoted: mek, caption: ' '+love})
					break
               ///MAKER
             case 'rteks':
					if (args.length < 1) return reply(mess.blank)
					tels5 = body.slice(7)
					if (tels5.length > 10) return reply('Teksnya kepanjangan, maksimal 10 karakter')
					reply(mess.wait)
					bufferi = await getBuffer(`https://api.vhtear.com/romancetext?text=${tels5}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, bufferi, image, {caption: 'nih bruh.....', quoted: mek})
					break
             ///MEDIA
              case 'tiktokstalk':
					try {
						if (args.length < 1) return frnky.sendMessage(from, 'Usernamenya mana um?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer3 = await getBuffer(user.avatarLarger)
						frnky.sendMessage(from, buffer3, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Kemungkinan username tidak valid')
					}
					break
             ///MEDIA
              case 'igstalk':
			
					if (args.length < 1) return reply('Masukan username mu!!')
					ige = body.slice(9)
					anu = await fetchJson(`https://api.vhtear.com/igprofile?query=${ige}&apikey=${vhtearkey}`, {method: 'get'})
					buffer7 = await getBuffer(anu.result.picture)
					capt = `User Ditemukan!!\n\n* Nama :* ${anu.result.full_name}\n* Username :* ${anu.result.username}\n* Followers :* ${anu.result.follower}\n* Mengikuti :* ${anu.result.follow}\n* Jumlah Post :* ${anu.result.post_count}\n* Private :* ${anu.result.is_private}\n* Bio :* ${anu.result.biography}`
					frnky.sendMessage(from, buffer7, image, {quoted: mek, caption: capt})
					break
   ///MAKER
    case 'nulis':
	case 'tulis':
	if (args.length < 1) return reply(`kek gini bruh \nContoh : ${prefix}nulis Franky/8.5/hai`)
					tulis = body.slice(7)
				  nama = tulis.split("/")[0];
					kelas = tulis.split("/")[1];
					isi = tulis.split("/")[2];
					nulis = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${isi}&tinta=4`, {method: 'get'})
					frnky.sendMessage(from, nulis, image, {quoted: freply})
					break
            ///OTHER
             case 'happymod':
                                        toby = body.slice(10)
                                        if (args.length < 1) return reply(`nama game nya apa su? \nContoh : ${prefix}happymod coc`)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${toby}&apikey=${tobzkey}`, {method: 'get'})
                                        hepi = anu.result[0]
                                        buffer = await getBuffer(hepi.image)
                                        teks = ` *HAPPY MOD* \n Title : ${hepi.title} \n Size : ${hepi.size} \n Version : ${hepi.version} \n Root : ${hepi.root} \n Purchase : ${hepi.purchase} \n   Price : ${hepi.price} \n   Link : ${hepi.link} \n  └─ ❏ Download : ${hepi.download} `
                                        frnky.sendMessage(from, `${teks}`, text, { quoted: freply})
                                        break
            ///DOWNLOAD
            case 'tiktok':
					if (args.length < 1) return reply('Url Tiktodnya mana?')
					if (!isUrl(args[0]) && !args[0].includes('vt')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${args[0]}&apikey=${vhtearkey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.video)
					frnky.sendMessage(from, buffer, video, {quoted: freply})
					break
 case 'tiktoknowm':
 if (args.length < 1) return reply('Url Tiktodnya mana?')
					if (!isUrl(args[0]) && !args[0].includes('vt')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktok_nowm?url=${args[0]}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					frnky.sendMessage(from, buffer, video, {quoted: freply})
					break
         ///DOWNLOAD  
       
                case 'igdl':
				if (args.length < 1) return reply('Url instagramnya mana?')
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com'))
				reply(mess.wait)
				    anu = await fetchJson(`https://videfikri.com/api/igdl/?url=${args[0]}`, {method: 'get'}) 
				    teks = `• Username : ${anu.result.username}\n• Durasi : ${anu.result.duration}\n*_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_*`
				    frnky.sendMessage(from, `${teks}`, text, { quoted: waitsu})
				    buffer = await getBuffer(anu.result.video)
				    frnky.sendMessage(from, buffer, video, {mimtype: 'video/mp4', quoted: freply})
				    break
case 'igtv':
				if (args.length < 1) return reply('Url instagramnya mana?')
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com'))
				reply(mess.wait)
				    anu = await fetchJson(`https://videfikri.com/api/igtv/?url=${args[0]}`, {method: 'get'}) 
				    teks = `• Username : ${anu.result.username}\n• Durasi : ${anu.result.duration}\n*_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_*`
				    frnky.sendMessage(from, `${teks}`, text, { quoted: waitsu})
				    buffer = await getBuffer(anu.result.video_url)
				    frnky.sendMessage(from, buffer, video, {mimtype: 'video/mp4', quoted: freply})
				    break
 ///DOWNLOAD
             case 'fb':
					if (args.length < 1) return reply('Url fbnya mana?')
					if (!isUrl(args[0]) && !args[0].includes('www.facebook.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/fbdl?link=${args[0]}&apikey=${vhtearkey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.VideoUrl)
					frnky.sendMessage(from, buffer, video, {mimetype: 'video/mp4', quoted: freply, caption: 'nih bruh...'})
					break
           ///MEDIA
             case 'ytsearch':
					if (args.length < 1) return reply('Yang mau di cari apaan? titit?')
					anu = await fetchJson(`https://api.vhtear.com/youtube?query=$ytsearch1}&apikey=${vhtearkey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `*Title* : ${i.title}\n*Id* : ${i.id}\n*Published* : ${i.publishTime}\n*Duration* : ${i.duration}\n*Views* : ${h2k(i.views)}\n=================\n`
					}
					reply(teks.trim())
					break
         ///DOWNLOAD
       case 'film':
				if (args.length < 1) return reply('Nama Filmnya Apa?')
				reply(mess.wait)
				anu = await fetchJson(`https://api.vhtear.com/downloadfilm?judul=${body.slice(6)}&apikey=${vhtearkey}`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				film = `� Judul: *${anu.result.judul}*\n� Resolusi: *${anu.result.data.resolusi}*\n� Link Download: *${anu.result.data.urlDownload}*\n`
				frnky.sendMessage(from, film, text, {quoted: mek}) 
					break
      
            ///OTHER
             case 'playstore':
					kuji = body.slice(7)
					anu = await getBuffer(`https://api.vhtear.com/playstore?query={kuji}&apikey=${vhtearkey}`, {method: 'get'})
					capty = `*➸ title :* ${anu.title}\n*➸ app_id :* ${anu.app_id}\n*➸ description :* ${anu.description}\n*➸ developer_id :* ${anu.developer_id}\n*➸ developer :* ${anu.developer}\n*➸ score :* ${anu.score}\n*➸ full_price :* ${anu.full_price}\n*➸ price :* ${anu.price}\n*➸ free :* ${anu.free}`
					frnky.sendMessage(from, anu, image, {quoted: mek, caption: capty})
					break
			case 'truth':
				const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengharuh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
				const ttrth = trut[Math.floor(Math.random() * trut.length)]
				truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
				frnky.sendMessage(from, truteh, image, { caption: 'Truth\n\n' + ttrth, quoted: mek })
				break
			case 'dare':
				const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
				const der = dare[Math.floor(Math.random() * dare.length)]
				tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
				frnky.sendMessage(from, tod, image, { quoted: mek, caption: 'Dare\n\n' + der })
				break
			case 'cr1':
				// licensed by aex-bot -> namabotnte
				var split = args.join(' ').replace(/@|\d/gi, '').split('|')
				var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const target = {
					contextInfo: {
						participant: taged,
						quotedMessage: {
							extendedTextMessage: {
								text: split[0]
							}
						}
					}
				}
				frnky.sendMessage(from, `${split[1]}`, MessageType.text, target)
				break
			case 'stikel':
				const a = "Franky"
				const b = "Bot"
				var teks = 'processing data, please wait'
				await createExif(a, b)
				await sleep(3000)
				await frnky.sendMessage(from, teks, MessageType.text)
				let op = "author: " + a + "\n"
				op += "pack: " + b + "\n"
				op += "name: Franky"
				if (isMedia && !m.message.imageMessage || isQuotedVideo) {
					const decryptMedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const mediaData = await conn.downloadMediaMessage(decryptMedia)
					if (Buffer.byteLength(mediaData) >= 6186598.4) return frnky.sendMessage(from, `sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`, MessageType.text)
					modifWebp(jam, mediaData).then(res => {
						frnky.sendMessage(from, res, MessageType.sticker, {
							contextInfo: {
								participant: "60168485784@s.whatsapp.net",
								quotedMessage: {
									conversation: op
								}
							}
						})
					})
				} else if (isMedia && !m.message.videoMessage || isQuotedImage) {
					const decryptMedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					let asu = (fs.readFileSync('./image/image.jpg', {
						encoding: 'base64'
					}))
					const roundedCorners = Buffer.from(
						'<svg><rect x="0" y="0" width="600" height="600" rx="300" ry="300"/></svg>'
					);
					await frnky.downloadMediaMessage(decryptMedia).then(mediaData => {
						sharp(mediaData).resize({
							width: 600,
							height: 600
						}).composite([{
							input: roundedCorners,
							blend: 'dest-in'
						}]).webp().toBuffer().then(buffer => {
							modifExif(buffer, jam, (res) => {
								frnky.sendMessage(from, res, MessageType.sticker, {
									quoted: mek,
									thumbnail: asu.toString("base64")
								})
							})
						})
					})
				}
				break
			/*case 'p':    PR INI SU BLOM KELAR:V
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					frnky.sendMessage(from, `${myteks}`, text, {quoted: { key: { fromMe: false, participant: `${numbernye}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${ghoibsu}` }}})
					break
			case 'setghoibreply':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `𝙎𝙮𝙨𝙩𝙚𝙢 𝘾𝙝𝙖𝙣𝙜𝙚 𝙂𝙝𝙤𝙞𝙗`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				ghoibsu = args[0]
				frnky.sendMessage(from, `Succes Mengganti Ghoib Reply : ${ghoibsu}`, MessageType.text, selepbot)
				break
			case 'setmyteks':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `𝙎𝙮𝙨𝙩𝙚𝙢 𝘾𝙝𝙖𝙣𝙜𝙚 𝙂𝙝𝙤𝙞𝙗`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				myteks = args[0]
				frnky.sendMessage(from, `Succes Mengganti My Teks : ${myteks}`, MessageType.text, selepbot)
				break*/
			case 'settarget':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `SETTARGET`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				targetprivate = args[0]
				frnky.sendMessage(from, `Succes Mengganti target Private Fake Reply : ${targetprivate}`, MessageType.text, selepbot)
				break
			case 'cr2':
				jids = `${targetprivate}@s.whatsapp.net` // nomer target
				var split = args.join(' ').replace(/@|\d/gi, '').split('|')
				var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const options = {
					contextInfo: {
						quotedMessage: {
							extendedTextMessage: {
								text: split[0]
							}
						}
					}
				}
				const responye = await frnky.sendMessage(jids, `${split[1]}`, MessageType.text, options)
				await frnky.deleteMessage(jids, { id: responye.messageID, remoteJid: jids, fromMe: true })
				break
			case 'antidelete':
				const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
				const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
				const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
				const isRevoke = dataRevoke.includes(from)
				const isCtRevoke = dataCtRevoke.data
				const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
				const argz = body.split(' ')
				if (argz.length === 1) return frnky.sendMessage(from, `Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`, MessageType.text)
				if (argz[1] == 'aktif') {
					if (isGroup) {
						if (isRevoke) return frnky.sendMessage(from, `Antidelete telah diaktifkan di grup ini sebelumnya!`, MessageType.text)
						dataRevoke.push(from)
						fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						frnky.sendMessage(from, `Antidelete diaktifkan di grup ini!`, MessageType.text)
					} else if (!isGroup) {
						frnky.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctaktif*`, MessageType.text)
					}
				} else if (argz[1] == 'ctaktif') {
					if (!isGroup) {
						if (isCtRevoke) return frnky.sendMessage(from, `Antidelete telah diaktifkan di semua kontak sebelumnya!`, MessageType.text)
						dataCtRevoke.data = true
						fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						frnky.sendMessage(from, `Antidelete diaktifkan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						frnky.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete aktif*`, MessageType.text)
					}
				} else if (argz[1] == 'banct') {
					if (isBanCtRevoke) return frnky.sendMessage(from, `kontak ini telah ada di database banlist!`, MessageType.text)
					if (argz.length === 2 || argz[2].startsWith('0')) return frnky.sendMessage(from, `Masukan nomer diawali dengan 62! contoh 62859289xxxxx`, MessageType.text)
					dataBanCtRevoke.push(argz[2] + '@s.whatsapp.net')
					fs.writeFileSync('./src/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
					frnky.sendMessage(from, `Kontak ${argz[2]} telah dimasukan ke banlist antidelete secara permanen!`, MessageType.text)
				} else if (argz[1] == 'mati') {
					if (isGroup) {
						const index = dataRevoke.indexOf(from)
						dataRevoke.splice(index, 1)
						fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						frnky.sendMessage(from, `Antidelete dimatikan di grup ini!`, MessageType.text)
					} else if (!isGroup) {
						frnky.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctmati*`, MessageType.text)
					}
				} else if (argz[1] == 'ctmati') {
					if (!isGroup) {
						dataCtRevoke.data = false
						fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						frnky.sendMessage(from, `Antidelete dimatikan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						frnky.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete mati*`, MessageType.text)
					}
				}
				break
          ///MAKER
             case 'mlogo':
					if (args.length < 1) return reply('Teksnya mana su')
					teks = body.slice(6)
					loog = await getBuffer(`https://api.vhtear.com/gamelogo?text=${teks}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, loog, image, {quoted: mek, caption: 'Logo '+teks})
					break
          ///MEDIA
			case 'kbbi':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const kbbigan = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				var kbbi = body.slice(6)
				axios.get(`https://tobz-api.herokuapp.com/api/kbbi?kata=${kbbi}&apikey=${tobzkey}`).then((res) => {
					let hasil = `「 HASIL 」\n${res.data.result}`;
					frnky.sendMessage(from, 'wait 🏃‍♂️', MessageType.text)
					frnky.sendMessage(from, hasil, MessageType.text, kbbigan);
				})
				break
      ///GROUP
			case 'linkgc':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const linkgcgan = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (!isGroup) return reply(mess.only.group)
				const linkgc = await frnky.groupInviteCode(from)
				frnky.sendMessage(from, `https://chat.whatsapp.com/${linkgc}`, MessageType.text, linkgcgan)
				break
      
      ///ANIME
			case 'loli':
				{
					var items = ["anime loli"];
					var nime = items[Math.floor(Math.random() * items.length)];
					var url = "https://api.fdci.se/rep.php?gambar=" + nime;

					axios.get(url)
						.then((result) => {
							var n = JSON.parse(JSON.stringify(result.data));
							var nimek = n[Math.floor(Math.random() * n.length)];
							imageToBase64(nimek)
								.then(
									(response) => {
										frnky.sendMessage(from, 'wait 🏃‍♂️', MessageType.text, { quoted: mek })
										var buf = Buffer.from(response, 'base64');
										frnky.sendMessage(from, buf, MessageType.image, { caption: `LOMLI`, quoted: mek })
									}
								)
								.catch(
									(error) => {
										console.log(error);
									}
								)
						});
				}
				break
        ///MAKER
			case 'tahta':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `HARTA TAHTA`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const tahta = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				var teks = encodeURIComponent(body.slice(7))
				if (!teks) return frnky.sendMessage(from, 'Input teks yang ingin di tulis', msgType.text, { quoted: mek })
				var buffer = await getBuffer(`https://api.vhtear.com/hartatahta?text=${teks}&apikey=${vhtearkey}`)
				frnky.sendMessage(from, `wait 🏃‍♂️`, MessageType.text, tahta)
				frnky.sendMessage(from, buffer, MessageType.image, { caption: `HARTA TAHTA ${teks}`, quoted: mek })
				break
         ///OTHER
			case 'map':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				const maping = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				var teks = body.slice(5)
				axios.get('https://mnazria.herokuapp.com/api/maps?search=' + teks)
					.then((res) => {
						imageToBase64(res.data.gambar)
							.then(
								(ress) => {
									frnky.sendMessage(from, 'wait 🏃‍♂️', MessageType.text, maping)
									var buf = Buffer.from(ress, 'base64')
									frnky.sendMessage(from, buf, MessageType.image, { caption: `${teks}`, quoted: mek })
								})
					})
				break
         ///MAKER
			case 'thunder':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				const thunder = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				var teks = encodeURIComponent(body.slice(9))
				if (!teks) return frnky.sendMessage(from, 'Teksnya mana block!', MessageType.text, { quoted: mek })
				var buffer = await getBuffer(`https://api.vhtear.com/thundertext?text=${teks}&apikey=${vhtearkey}`)
				frnky.sendMessage(from, `wait 🏃‍♂️`, MessageType.text, thunder)
				frnky.sendMessage(from, buffer, MessageType.image, { caption: `THUNDER : ${teks}`, quoted: mek })
				break
          ///INFO
             case 'virtex':
					frnky.sendMessage(from, virtex(prefix) , text, { quoted: mek })
					break
					case 'sendvir1':
                 frnky.sendMessage(from, sendvir1(prefix) , text, { quoted: mek })
					break
                    case 'sendvir2':
                 frnky.sendMessage(from, sendvir2(prefix) , text, { quoted: mek })
					break
           ///OTHER
			case 'otakulast':
				anu = await fetchJson(`https://api.vhtear.com/otakulatest&apikey=${vhtearkey}`, { method: 'get' })
				if (anu.error) return reply(anu.error)
				teks = '=================\n\n'
				for (let i of anu.result.data) {
					teks += `Title : ${i.title}\n*Link* : ${i.link}\n*Published* : ${i.datetime}\n\n=================\n\n`
				}
				reply(teks.trim())
				break
          ///NSFW
			case 'randomhentai':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				gatauda = body.slice(6)
				frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=${tobzkey}`, { method: 'get' })
				buffer = await getBuffer(anu.result)
				frnky.sendMessage(from, buffer, image, { caption: `RANDOM HENTAI!`, quoted: mek })
				break
          ///NSFW
              case 'xxx':
			    reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    teks = body.slice(5)
                    anu = await fetchJson(`https://api.vhtear.com/xxxsearch?query=${teks}&apikey=${vhtearkey}`, {method: 'get'})
                    teks = `===============\n`
                    {
                    teks += `• Title: ${anu.data.title}\n• Durasi: ${anu.data.durasi}\n• Link: ${anu.data.url}\n===============\n`
                    }
                    reply(teks.trim())
			     	break
           ///NSFW
             case 'bokep':
             var itsme = `${numbernye}@s.whatsapp.net`
				var split = `Bokep🏃‍♂️`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
					anu = await fetchJson(`https://api.vhtear.com/pinterest?query=cewesange&apikey=${vhtearkey}`, {method: 'get'})
					var mi = JSON.parse(JSON.stringify(anu.result));
					var ku =  mi[Math.floor(Math.random() * mi.length)];
					nyec = await getBuffer(ku)
					frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
					frnky.sendMessage(from, nyec, image, { caption: 'Bokep :V', quoted: mek })
					break
         ///NSFW
			case 'nsfwneko':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				gatauda = body.slice(6)
				frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=${tobzkey}`, { method: 'get' })
				buffer = await getBuffer(anu.result)
				frnky.sendMessage(from, buffer, image, { caption: `NSFW NEKO!`, quoted: mek })
				break
         ///NSFW
			case 'nsfwtrap':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				gatauda = body.slice(6)
				frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=${tobzkey}`, { method: 'get' })
				buffer = await getBuffer(anu.result)
				frnky.sendMessage(from, buffer, image, { caption: `NSFW TRAP!`, quoted: mek })
				break
          ///MAKER
             case 'blackpink':
			var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
             if (args.length < 1) return reply(mess.blank)
					kontol = body.slice(11)
					reply(mess.wait)
					tigaa1 = await getBuffer(`https://api.vhtear.com/blackpinkicon?text=${kontol}&apikey=${vhtearkey}`)
					frnky.sendMessage(from, tigaa1, image, {caption: 'Black pink :V', quoted: mek})
					break
      case 'youtuber':
       youmek = body.slice(9)
					reply(mess.wait)
					yousu = await getBuffer(`https://onlydevcity.xyz/YoutuberSerti/img.php?nama=${youmek}`)
					frnky.sendMessage(from, yousu, image, {caption: 'Selamat :V', quoted: mek})
					break
   case 'bocilepep':
       cilsu = body.slice(10)
					reply(mess.wait)
					bosu = await getBuffer(`https://onlydevcity.xyz/CilEpepSerti/img.php?nama=${cilsu}`)
					frnky.sendMessage(from, bosu, image, {caption: 'Bocil epep :V', quoted: mek})
					break
    case 'hekel':
       hemkel = body.slice(6)
					reply(mess.wait)
					hekesu = await getBuffer(`https://onlydevcity.xyz/HekerSerti/img.php?nama=${hemkel}`)
					frnky.sendMessage(from, hekesu, image, {caption: 'Hekel :V', quoted: mek})
					break
      case 'googlemkr':
      if (args.length < 1) return reply('teksnya mana su?')
      goesu = body.slice(10)
				tek1 = goesu.split("|")[0];
                tek2 = goesu.split("|")[1];
                tek3 = goesu.split("|")[2];
                goglesu = await getBuffer(`https://api.vhtear.com/googletext?text1=${tek1}&text2=${tek2}&text3=${tek3}&apikey=${vhtearkey}`)
			    frnky.sendMessage(from, goglesu, image, {caption: 'done bruh...', quoted: mek})
         ///MAKER
              case 'lovemake':
              	    if (args.length < 1) return reply('teksnya mana su?')
                    teks = `${body.slice(9)}`
                    if (teks.length > 10) return frnky.sendMessage(from, 'Teksnya kepanjangan, Maksimal 9 karakter', text, {quoted: mek})
                    buffer6 = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${teks}&apikey=${vhtearkey}`, {method: 'get'})
                    frnky.sendMessage(from, buffer6, image, {quoted: mek, caption: `${teks}`})
			     	break 
		///MAKER
             case 'ffbanner':
             var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return reply('Teksnya mana um')
					love = body.slice(10)
					if (love.length > 12) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					buffer = await getBuffer(`https://api.vhtear.com/bannerff?title= ${love}&text=FRANKY%20GANS&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, buffer, image, {quoted: mek, caption: ' '+love})
					break
             ///NSFW
			case 'nsfwblowjob':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				gatauda = body.slice(6)
				frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=${tobzkey}`, { method: 'get' })
				buffer = await getBuffer(anu.result)
				frnky.sendMessage(from, buffer, image, { caption: `BLOWJOB!`, quoted: mek })
				break
           ///ANIME
			case 'animehuggif':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				gatauda = body.slice(6)
				frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hug?apikey=${tobzkey}`, { method: 'get' })
				buffer = await getBuffer(anu.result)
				frnky.sendMessage(from, buffer, image, { quoted: mek })
				break
            ///ANIME
			case 'waifu':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				axios.get(`https://docs-jojo.herokuapp.com/api/waifu2`).then((res) => {
					imageToBase64(res.data.img)
						.then(
							(ress) => {
								var buf = Buffer.from(ress, 'base64')
								frnky.sendMessage(from, mess.wait, MessageType.text, selepbot)
								frnky.sendMessage(from, buf, MessageType.image)
							})
				})
				break
				case 'neonime':
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
					teks = '---------------------\n'
					for (let i of data.result) {
						teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n---------------------\n`
					}
					reply(teks.trim())
					break  
			case 'menu':
			case 'help':
				runtime = process.uptime()
				frnky.sendMessage(from, `
❏ Lib: Baileys/FrankyGanz
❏ Prefix: 「${prefix}」
❏ Creator: MhankBarBar
❏ Remodefikasi : @Franky397
❏ Publik: ${publik}
❏ Waktu: ${time}
❏ Bulan : ${bulan}

❏ ${prefix}public
❏ ${prefix}self
❏ ${prefix}virtex
❏ ${prefix}download
❏ ${prefix}anime
❏ ${prefix}media
❏ ${prefix}voice
❏ ${prefix}maker
❏ ${prefix}fun
❏ ${prefix}nsfw
❏ ${prefix}stickerlist
❏ ${prefix}imagelist 
❏ ${prefix}vnlist 
❏ ${prefix}videolist 
❏ ${prefix}antidelete ctaktif / ctmati
❏ ${prefix}antidelete aktif / mati
❏ ${prefix}payment
❏ ${prefix}cr1 @tag text|text
❏ ${prefix}runtime
❏ ${prefix}ping
❏ ${prefix}cekchat

❏  POPULER

❏ ${prefix}googlemkr [teks|teks|teks]
❏ ${prefix}bocilepep [teks]
❏ ${prefix}youtuber [teks]
❏ ${prefix}hekel [teks]
❏ ${prefix}tinyurl
❏ ${prefix}hurufkebalik [teks]
❏ ${prefix}spamcall [831xxx]
❏ ${prefix}ytmp4 [linkYT]
❏ ${prefix}play [lagu]
❏ ${prefix}brainly [query]

SELF-KY`, MessageType.text, {quoted: freply})
				break
         ///INFO
			case 'return':
				return frnky.sendMessage(from, JSON.stringify(eval(args.join(''))), text, {quoted: freply})
				break
         ///LIST
			case 'getsticker':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `_*SELF-KY*_`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				namastc = body.slice(12)
				result = fs.readFileSync(`./src/sticker/${namastc}.webp`)
				frnky.sendMessage(from, result, sticker, {quoted: freply})
				break
         ///LIST
			case 'stickerlist':
			case 'liststicker':
			case 'lists':
				teks = '*Sticker List :*\n\n'
				for (let awokwkwk of setiker) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${setiker.length}*`
				frnky.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": setiker } })
				break
        ///LIST
			case 'addsticker':
				if (!isQuotedSticker) return reply('Reply stiker nya')
				svst = body.slice(12)
				if (!svst) return reply('Nama sticker nya apa?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await frnky.downloadMediaMessage(boij)
				setiker.push(`${svst}`)
				fs.writeFileSync(`./src/sticker/${svst}.webp`, delb)
				fs.writeFileSync('./src/stik.json', JSON.stringify(setiker))
				frnky.sendMessage(from, `Makasi Stickernya:v`, MessageType.text, { quoted: freply })
				break
        ///LIST
			case 'addvn':
				if (!isQuotedAudio) return reply('Reply vnnya blokk!')
				svst = body.slice(7)
				if (!svst) return reply('Nama audionya apa su?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await frnky.downloadMediaMessage(boij)
				audionye.push(`${svst}`)
				fs.writeFileSync(`./src/audio/${svst}.mp3`, delb)
				fs.writeFileSync('./src/audio.json', JSON.stringify(audionye))
				frnky.sendMessage(from, `Makasi Audionya :v`, MessageType.text, { quoted: freply })
				break
         ///LIST
			case 'getvn':
				namastc = body.slice(7)
				buffer = fs.readFileSync(`./src/audio/${namastc}.mp3`)
				frnky.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: freply, ptt: true })
				break
        ///LIST
			case 'listvn':
			case 'vnlist':
				teks = '*List Vn:*\n\n'
				for (let awokwkwk of audionye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${audionye.length}*`
				frnky.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": audionye } })
				break
        ///LIST
			case 'addimage':
				if (!isQuotedImage) return reply('Reply imagenya blokk!')
				svst = body.slice(10)
				if (!svst) return reply('Nama imagenya apa su?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await frnky.downloadMediaMessage(boij)
				imagenye.push(`${svst}`)
				fs.writeFileSync(`./src/image/${svst}.jpeg`, delb)
				fs.writeFileSync('./src/image.json', JSON.stringify(imagenye))
				frnky.sendMessage(from, `Makasi Gambarnya :v `, MessageType.text, { quoted: freply })
				break
         ///LIST
			case 'getimage':
				namastc = body.slice(10)
				buffer = fs.readFileSync(`./src/image/${namastc}.jpeg`)
				frnky.sendMessage(from, buffer, image, { quoted: frankysu, caption: `${namastc}` })
				break
       ///LIST
			case 'imagelist':
			case 'listimage':
				teks = '*List Image :*\n\n'
				for (let awokwkwk of imagenye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${imagenye.length}*`
				frnky.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": imagenye } })
				break
         ///LIST
			case 'addvideo':
				if (!isQuotedVideo) return reply('Reply videonya blokk!')
				svst = body.slice(10)
				if (!svst) return reply('Nama videonya apa su?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await frnky.downloadMediaMessage(boij)
				videonye.push(`${svst}`)
				fs.writeFileSync(`./src/video/${svst}.mp4`, delb)
				fs.writeFileSync('./src/video.json', JSON.stringify(videonye))
				frnky.sendMessage(from, `Makasi Videonya :v`, MessageType.text, { quoted: freply })
				break
         ///LIST
			case 'getvideo':
				namastc = body.slice(10)
				buffer = fs.readFileSync(`./src/video/${namastc}.mp4`)
				frnky.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
				break
         ///LIST
			case 'listvideo':
			case 'videolist':
				teks = '*List Video :*\n\n'
				for (let awokwkwk of videonye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${videonye.length}*`
				frnky.sendMessage(from, teks.trim(), extendedText, { quoted: freply, contextInfo: { "mentionedJid": videonye } })
				break
			case 'howax':
			case 'hoax':
			case 'howak':
			case 'hoak':
				frnky.updatePresence(from, Presence.composing)
				data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, { method: 'get' })
				teks = '────────────────────\n\n'
				for (let i of data.result) {
					teks += `Title : ${i.title}\n*Link* : ${i.link}\n*Tag* : ${i.tag}\n\n────────────────────\n`
				}
				reply(teks.trim())
				break
          ///FUN
             case 'katagw':
                reply(mess.wait)
				quotes = body.slice(1)
				const kta =['Lebih baik mengerti sedikit daripada salah mengerti.','Hampir semua pria memang mampu bertahan menghadapi kesulitan. Namun, jika Anda ingin menguji karakter sejati pria, beri dia kekuasaan.','Bila tekad seseorang kuat dan teguh, Tuhan akan bergabung dalam usahanya.','Penderitaan adalah pelajaran.','Ilmu pengetahuan tanpa agama adalah pincang.','Hidup itu seperti sebuah sepeda, agar tetap seimbang kita harus tetap bergerak.','Perbedaan masa lalu, sekarang, dan masa depan tak lebih dari ilusi yang keras kepala.','Sebuah meja, sebuah kursi, semangkuk buah, dan sebuah biola; apa lagi yang dibutuhkan agar seseorang bisa merasa bahagia?','Belas kasihanlah terhadap sesama, bersikap keraslah terhadap diri sendiri.','Cara paling baik untuk menggerakkan diri Anda ialah memberi tugas kepada diri sendiri.','Kita tidak boleh kehilangan semangat. Semangat adalah stimulan terkuat untuk mencintai, berkreasi dan berkeinginan untuk hidup lebih lama.','Manusia akan bahagia selama ia memilih untuk bahagia.','Saya tidak berharap menjadi segalanya bagi setiap orang. Saya hanya ingin menjadi sesuatu untuk seseorang.','Apabila sempurna akal seseorang, maka sedikit perkataannya.','Bahagialah orang yang dapat menjadi tuan untuk dirinya, menjadi kusir untuk nafsunya dan menjadi kapten untuk bahtera hidupnya.','Sahabat yang jujur lebih besar harganya daripada harta benda yang diwarisi dari nenek moyang.','Yang paling melelahkan dalam hidup adalah menjadi orang yang tidak tulus.','Terbuka untuk Anda, begitulah Tuhan memberi kita jalan untuk berusaha. Jangan pernah berfikir jalan sudah tertutup.','Penundaan adalah kuburan dimana peluang dikuburkan.','Cinta bukan saling menatap mata, namun melihat ke arah yang sama bersama-sama.','Kita adalah apa yang kita kerjakan berulang kali. Dengan demikian, kecemerlangan bukan tindakan, tetapi kebiasaan.','Jangan pernah mencoba menjadikan putra atau putri Anda menjadi seperti Anda. Diri Anda hanya cukup satu saja.','Jika Anda bisa membuat orang lain tertawa, maka Anda akan mendapatkan semua cinta yang Anda inginkan.','Masalah akan datang cepat atau lambat. Jika masalah datang, sambut dengan sebaik mungkin. Semakin ramah Anda menyapanya, semakin cepat ia pergi.','Kita tak bisa melakukan apapun untuk mengubah masa lalu. Tapi apapun yang kita lakukan bisa mengubah masa depan.','Kesabaran adalah teman dari kebijaksanaan.','Orang-orang kreatif termotivasi oleh keinginan untuk maju, bukan oleh keinginan untuk mengalahkan orang lain.','Dimanapun engkau berada selalulah menjadi yang terbaik dan berikan yang terbaik dari yang bisa kita berikan.','Kebencian seperti halnya cinta, berkobar karena hal-hal kecil.','Anda tidak perlu harus berhasil pada kali pertama.','Satu jam yang intensif, jauh lebih baik dan menguntungkan daripada bertahun-tahun bermimpi dan merenung-renung.','Hal terbaik yang bisa Anda lakukan untuk orang lain bukanlah membagikan kekayaan Anda, tetapi membantu dia untuk memiliki kekayaannya sendiri.','Tidak ada jaminan keberhasilan, tetapi tidak berusaha adalah jaminan kegagalan.','Aku tidak tahu kunci sukses itu apa, tapi kunci menuju kegagalan adalah mencoba membuat semua orang senang.']
				const su = kta[Math.floor(Math.random() * kta.length)]
				frnky.sendMessage(from, ''+su+'\n\n_-kata gw :V._', text, { quoted: mek })
				break
             ///MAKER
              case 'party':
				
					if (args.length < 1) return reply(mess.blank)
					part = body.slice(7)
					reply(mess.wait)
					bufferu = await getBuffer(`https://api.vhtear.com/partytext?text=${part}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, bufferu, image, {caption: 'Nih kak', quoted: mek})
					break
              ///MAKER
             case 'coffeteks':
					if (args.length < 1) return reply(`format salah`)
					coff = body.slice(11)
					mhe = await fetchJson(`https://api.shizukaa.xyz/api/coffie?apikey=itsmeiky633&text=${coff}`)
					atu = await getBuffer(mhe.result.url)
					frnky.sendMessage(from, atu, image, {quoted: mek})
					break
            ///MAKER
           
              ///OTHER
              case 'covid':
					
                   frnky.updatePresence(from, Presence.composing) 
                   data = await fetchJson(`https://arugaz.herokuapp.com/api/corona?country=${body.slice(7)}`)
                   if (data.result) reply(data.result)
                   hasil = `Negara : ${data.result.country}\n\nActive : ${data.result.active}\ncasesPerOneMillion : ${data.result.casesPerOneMillion}\ncritical : ${data.result.critical}\ndeathsPerOneMillion : ${data.result.deathsPerOneMillion}\nrecovered : ${data.result.recovered}\ntestPerOneMillion : ${data.result.testPerOneMillion}\ntodayCases : ${data.result.todayCases}\ntodayDeath : ${data.result.todayDeath}\ntotalCases : ${data.result.totalCases}\ntotalTest : ${data.result.totalTest}`
                   reply(hasil)
                   break
           ///FUN
              case 'pantun':
					anu = await fetchJson(`https://api.vhtear.com/random_pantun&apikey=${vhtearkey}`, {method: 'get'})
					buffer = await getBuffer(anu.result.pantun)
					frnky.sendMessage(from, buffer, text, {quoted: mek})
					break		
		///MAKER
       case 'ultah':
				if (args.length < 1) return reply(`teksnya mana?`)	
				ct = body.slice(6)
				reply(`wait....`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro10?text=${ct}&theme=birthday&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh...`})
				break
         ///MAKER
         case 'logopubg':
				if (args.length < 1) return reply(`salah bruh\n contoh : ${prefix}pubglogo franky|self`)
				ct = body.slice(9)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/game?text=${ll1}&text2=${ll2}&theme=pubg&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
         case 'wolf': 
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(5)
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro?text=${ct}&theme=wolf-metal&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
         case 'glitch': 
				if (args.length < 1) return reply(`teksnya mana`)
				ct = body.slice(7)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker?text=${ll1}&text2=${ll2}&theme=glitch&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
         case 'neon': 
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(5)
				reply(`wait....`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/metallic?text=${ct}&theme=neon&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
		case 'glow': 
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(5)
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/senja?text=${ct}&theme=glow&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
      
         case 'hilih':
				if (args.length < 1) return reply(`teksnya mana?`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/hilih?kata=${body.slice(6)}&apikey=${onlydevkey}`, {method: 'get'})
				reply(anu.result.result)
				break
         case 'quotes': 
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/quotes/kanye?apikey=${onlydevkey}`)
				hasil = ` *Author* : ${anu.result.author}\n* ENG :* ${anu.result.text_en}\n* IND :* ${anu.result.text_id}`
				frnky.sendMessage(from, hasil, text, {quoted: mek})
				break
       case 'hurufkebalik': 
                njersu = body.slice(13)
				anu = await fetchJson(`https://videfikri.com/api/hurufterbalik/?query=${njersu}`)
				kebaliksu = ` *KATA* : ${anu.result.kata}`
				frnky.sendMessage(from, kebaliksu, text, {quoted: mek})
				break
         case 'cuaca': 
				if (args.length < 1) return reply(`nama kotanya apa? jongol?`)
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/cuaca?kota=${body.slice(6)}&apikey=${onlydevkey}`)
				teks = ` *Kota* : ${anu.result.data.Nama}\n* Longitude :* ${anu.result.data.Longitude}\n* Latitude :* ${anu.result.data.Latitude}\n* Suhu :* ${anu.result.data.Suhu}\n* Angin :* ${anu.result.data.Angin}\n* Kelembaban :* ${anu.result.data.Kelembaban}\n* Cuaca :* ${anu.result.data.Cuaca}\n* Keterangan :* ${anu.result.data.Keterangan}\n* Udara :* ${anu.result.data.Udara}`
				frnky.sendMessage(from, teks, text, {quoted: mek})
				break
        case 'bittext': 
				if (args.length < 1) return reply(`teksnya mana?`)	
				ct = body.slice(5)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev13?text=${ll1}&text2=${ll2}&theme=8bit&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
       
        case 'asap':
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(6)
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro3?text=${ct}&theme=smoke&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek})
				break
          
          case 'silkteks':
					if (args.length < 1) return reply(ind.wrongf())
					silk = body.slice(10)
					if (silk.length > 7) return reply('kepanjangan ngab teksnya..')
					buffer = await getBuffer(`https://api.vhtear.com/silktext?text=${silk}&apikey=${vhtearkey}`)
		    			frnky.sendMessage(from, buffer, image, {quoted: mek})
		    			break
		case 'glowing': 
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(8)
				reply(`wait....`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro1?text=${ct}&theme=glowing&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
		case 'heart': 
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(6)
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro?text=${ct}&theme=heart&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
      case 'gula': 
				if (args.length < 1) return reply(`teksnya mana?`)
				ct = body.slice(6)
				reply(`wait...`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro7?text=${ct}&theme=candy&apikey=${onlydevkey}`)
				buffer = await getBuffer(anu.result.url)
				frnky.sendMessage(from, buffer, image, {quoted: mek, caption: `done bruh..`})
				break
      
			///NSFW
             case 'randombokep':

				 data = fs.readFileSync('./frangky/18.js');
                 jsonData = JSON.parse(data);
                 randIndex = Math.floor(Math.random() * jsonData.length);
                 randKey = jsonData[randIndex];
                 randBokep = await getBuffer(randKey.image)
                 reply(mess.wait)
                 randTeks = randKey.teks
                 frnky.sendMessage(from, randBokep, image, {quoted: mek, caption: randTeks})

				break
           ///MAKER
             case 'gembok':
              	    if (args.length < 1) return reply('teksnya mana su?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return frnky.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buffer6 = await getBuffer(`https://api.vhtear.com/padlock?text1=${teks}&text2=${teks}&apikey=${vhtearkey}`, {method: 'get'})
                    frnky.sendMessage(from, buffer6, image, {quoted: mek, caption: `${teks}`})
			     	break
           ///OTHER
			case 'ssweb':
				if (args.length < 1) return reply('Urlnya mana om')
				teks = body.slice(7)
				reply(mess.wait)
				anu = await fetchJson(`https://api.vhtear.com/ssweb?link=${teks}&type=phone&apikey=${vhtearkey}`)
				buff = await getBuffer(anu.gambar)
				frnky.sendMessage(from, buff, image, { caption: `Result : ${teks}`, quoted: mek })
				break
         ///INFO
			case 'chatlist':
			case 'cekchat':
				//teks = 'This is list of chat number :\n'
				// for (let all of totalchat) {
				//teks += `~> @${totalchat}\n`
				//}
				teks = `Total : ${totalchat.length}`
               frnky.sendMessage(from, `Total : ${totalchat.length}`, text, { quoted: ceksu})
				break
        ///INFO
			case 'speed':
			case 'ping':
				const timestamp = speed();
				const latensi = speed() - timestamp
				exec(`neofetch --stdout`, (error, stdout, stderr) => {
					const child = stdout.toString('utf-8')
					const teks = child.replace(/Memory:/, "Ram:")
					
					const pingnya = `${teks}\nSpeed: ${latensi.toFixed(4)} Second`
					frnky.sendMessage(from, `${teks}*Speed: ${latensi.toFixed(4)} Second*`, text, { quoted: pingsu})
				})
				break
			case 'term':
				const cmd = body.slice(6)
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `*EXECUTOR*`
				const term = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				exec(cmd, (err, stdout) => {
					if (err) return frnky.sendMessage(from, `root@MrG3P5:~ ${err}`, text, { quoted: mek })
					if (stdout) {
						frnky.sendMessage(from, stdout, text, term)
					}
				})
				break
       ///INFO
			case 'payment':
			case 'payments':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `*PAYMENT-INFO*`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				frnky.sendMessage(from, `*──「 PAYMENT 」──*\n\n- - Nomer : ${nomer}`, text, { quoted: freply})
				break
            ///NSFW
                   case 'hot1':
					
					qute1 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute1, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/h2nygxbyb6n9cyo/VID-20210107-WA1468.mp4/file' })
					break
					case 'hot2':
					
					qute = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/pk8hozohzdc076c/VID-20210107-WA1466.mp4/file' })
					break
					case 'hot3':
					
					qute2 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute2, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/112q3u286tnvzjo/VID-20210107-WA1467.3gp/file' })
					break
					case 'hot4':
					
					qute3 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute3, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/arpphhxsv94ak0r/VID-20210107-WA1462.mp4/file' })
					break
					case 'hot5':
					
					qute4 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute4, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/us3f4j62emftbrf/VID-20210107-WA1463.mp4/file' })
					break
					case 'hot6':
					
					qute5 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute5, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/v4033tkl16hgf2b/VID-20210107-WA1459.mp4/file' })
					break
					case 'hot7':
					
					qute6 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute6, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/3scnim6d1x4b8ie/VID-20210107-WA1461.mp4/file' })
					break
                    case 'hot8':
					
					qute7 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute7, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/dx9tklonu0eq36w/VID-20210107-WA1464.mp4/file' })
					break
					case 'hot9':
					
					qute8 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute8, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/aipi6xisyppe751/VID-20210107-WA1465.mp4/file' })
					break
					case 'hot10':
					
					qute9 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute9, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/snwja297dv4zvtl/VID-20210107-WA0036.mp4/file' })
					break
					case 'hot11':
					
					qute10 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute11, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/60dqek0mqhyt6rn/VID-20210107-WA1530.mp4/file' })
					break
					case 'hot12':
					
					qute12 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute12, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/ni2mcdknb6zn50t/VID-20210107-WA1532.mp4/file' })
					break
					case 'hot13':
					
					qute11 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute11, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/i9t96lrmd9lm71z/VID-20210107-WA1542.mp4/file' })
					break
					case 'hot14':
					
					qute13 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute13, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/tjqdfmp8g08dt4e/VID-20210107-WA1536.mp4/file' })
					break
					case 'hot15':
					qute14 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute14, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/x034q0s16u9vyhy/VID-20210107-WA1537.mp4/file' })
					break
					case 'hot16':
					
					qute15 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute15, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/mgmynqghjnon2q7/VID-20210107-WA1533.mp4/file' })
					break
					case 'hot17':
					
					qute16 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute16, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/ecly00at6adxs20/VID-20210107-WA1540.mp4/file' })
					break
					case 'hot18':
					qute17 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute17, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/7qkn8nuog22jsco/VID-20210107-WA1534.mp4/file' })
					break
					case 'hot19':
					qute18 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute18, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/vza5uaben93dfdr/VID-20210107-WA1527.mp4/file' })
					break
					case 'hot20':
					qute19 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute19, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/l7uzd4v9p95wpeb/VID-20210107-WA1541.mp4/file' })
					break
					case 'hot21':
					qute20 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute20, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/icpnxsr18j6l2pp/VID-20210107-WA1528.mp4/file' })
					break
					case 'hot22':
					qute21 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute21, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/cscj9taoq5s5oj9/VID-20210107-WA1538.mp4/file' })
					break
					case 'hot23':
					qute22 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute22, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/saer161lthn4sy3/VID-20210107-WA1525.mp4/file' })
					break
					case 'hot24':
					qute23 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute23, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/9jy3nj2b2ljjzxb/VID-20210107-WA1539.mp4/file' })
					break
					case 'hot25':
					qute24 = await getBuffer(`https://i.ibb.co/98hHQLD/IMG-20210215-002010.jpg`)
					frnky.sendMessage(from, qute24, image, { quoted: mek, caption: 'Download sendiri ya su\n\nhttps://www.mediafire.com/file/j3hxseqc3uoc1v7/VID-20210107-WA1526.mp4/file' })
					break
           ///VOICE
            case 'r':                 
             
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=1:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: freply})
						fs.unlinkSync(ran)
					})
					break
          ///VOICE
       case 'bass':                 
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						frnky.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
					break
            ///MAKER
             case 'logml':
             
					if (args.length < 1) return reply('Teksnya mana um')
					mlbb = body.slice(6)
					if (mlbb.length > 10) return reply('Teksnya kepanjangan, maksimal 9 karakter')
					reply(mess.wait)
					buffer = await getBuffer(`https://api.vhtear.com/logoml?hero=layla&text=${mlbb}&apikey=${vhtearkey}`)
					frnky.sendMessage(from, buffer, image, {quoted: mek, caption: ' '+mlbb})
					break
          ///FUN
             case 'alay':
				
					anu = await fetchJson(`https://api.terhambar.com/bpk?kata=${body.slice(6)}`, {method: 'get'})
					reply('TULISAN ALAY :V:\n\n'+anu.result)
					break
        ///OTHER
             case 'artinama':
				
					if (args.length < 1) return reply('nama nya siapa su?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(6)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					break
         ///ANIME
			case 'neko':
				{
					var items = ["anime neko"];
					var nime = items[Math.floor(Math.random() * items.length)];
					var url = "https://api.fdci.se/rep.php?gambar=" + nime;

					axios.get(url)
						.then((result) => {
							var n = JSON.parse(JSON.stringify(result.data));
							var nimek = n[Math.floor(Math.random() * n.length)];
							imageToBase64(nimek)
								.then(
									(response) => {
										frnky.sendMessage(from, 'wait 🏃‍♂️', MessageType.text)
										var buf = Buffer.from(response, 'base64');
										frnky.sendMessage(from, buf, MessageType.image, { caption: `Neko!`, quoted: mek })
									}
								)
								.catch(
									(error) => {
										console.log(error);
									}
								)
						});
				}
				break
           ///MAKER
              case 'apiteks':
					if (args.length < 1) return reply('Teksnya mana su?')
					love = body.slice(8)
					if (love.length > 8) return reply('Teksnya kepanjangan, maksimal 7 karakter')
					bufferxcz = await getBuffer(`https://api.vhtear.com/fire_maker?text=${love}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, bufferxcz, image, {quoted: mek, caption: 'dh jadi su🗿'})
					break
         ///MAKER
              case 'lionlogo':
                
                      if (args.length < 1) return reply('contoh : zlionlogo franky|bot')
                      gwh = body.slice(9)
                      glw1 = gwh.split("|")[0];
                      glw2 = gwh.split("|")[1];
                      reply(mess.wait)
                      anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${glw1}&text2=${glw2}&apikey=${tobzkey}`, {method: 'get'})
                      buffers = await getBuffer(anu.result)
                      frnky.sendMessage(from, buffers, image, {quoted: mek})
                      break
            ///MAKER
             case 'airteks':
             var itsme = `${numbernye}@s.whatsapp.net`
				var split = `*AIRTEKS🗿*`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
              	    if (args.length < 1) return reply('teksnya mana kak?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return frnky.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buffer6 = await getBuffer(`https://api.vhtear.com/water_maker?text=${teks}&apikey=${vhtearkey}`, {method: 'get'})
                    frnky.sendMessage(from, buffer6, image, {quoted: mek, caption: `${teks}`})
			     	break
            ///MAKER
             case 'galaxtext':
				
              	    if (args.length < 1) return reply('teksnya mana njer?')
					teks = body.slice(11)
					if (teks.length > 8) return reply('Teksnya kepanjangan, maksimal 8 karakter')
					bufasfer = await getBuffer(`https://api.vhtear.com/galaxytext?text=${teks}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, bufasfer, image, {quoted: mek})
					break
             ///MAKER
             case 'pornlogo':
             var itsme = `${numbernye}@s.whatsapp.net`
				var split = `*PORNLOGO🗿*`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
					gh = `${body.slice(9)}`
					kon1 = gh.split("|")[0];
					kon2 = gh.split("|")[1];
					if (args.length < 1) return reply('Kek gini njer  zpornlogo franky|bot')
					buffer = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${kon1}&text2=${kon2}&apikey=${vhtearkey}`, {method: 'get'})
					frnky.sendMessage(from, buffer, image, {quoted: mek})
					break
           ///INFO
			case 'blocklist':
				teks = 'BLOCK LIST :\n'
				for (let block of blocked) {
					teks += `┣➢ @${block.split('@')[0]}\n`
				}
				teks += `TOTAL : ${blocked.length}`
				frnky.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": blocked } })
				break
        ///MAKER
			case 'ocr':
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await frnky.downloadAndSaveMediaMessage(encmedia)
					reply(mess.wait)
					await recognize(media, { lang: 'eng+ind', oem: 1, psm: 3 })
						.then(teks => {
							reply(teks.trim())
							fs.unlinkSync(media)
						})
						.catch(err => {
							reply(err.message)
							fs.unlinkSync(media)
						})
				} else {
					reply('𝗸𝗶𝗿𝗶𝗺 𝗳𝗼𝘁𝗼 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗲𝗽𝘁𝗶𝗼𝗻 ${prefix}𝗼??𝗿')
				}
				break

       ///MAKER
			case 's':
			case 'stiker':
			case 'sticker':
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.webp')
					await ffmpeg(`./${media}`)
						.input(media)
						.on('start', function (cmd) {
							console.log(`Started : ${cmd}`)
						})
						.on('error', function (err) {
							console.log(`Error : ${err}`)
							fs.unlinkSync(media)
							reply(mess.error.stick)
						})
						.on('end', function () {
							console.log('Finish')
							frnky.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: freply})
							fs.unlinkSync(media)
							fs.unlinkSync(ran)
						})
						.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
						.toFormat('webp')
						.save(ran)
				} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.webp')
					reply(mess.wait)
					await ffmpeg(`./${media}`)
						.inputFormat(media.split('.')[1])
						.on('start', function (cmd) {
							console.log(`Started : ${cmd}`)
						})
						.on('error', function (err) {
							console.log(`Error : ${err}`)
							fs.unlinkSync(media)
							tipe = media.endsWith('.mp4') ? 'video' : 'gif'
							reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
						})
						.on('end', function () {
							console.log('Finish')
							frnky.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
							fs.unlinkSync(media)
							fs.unlinkSync(ran)
						})
						.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
						.toFormat('webp')
						.save(ran)
				} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ranw = getRandom('.webp')
					ranp = getRandom('.png')
					reply(mess.wait)
					keyrmbg = 'Your-ApiKey'
					await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp }).then(res => {
						fs.unlinkSync(media)
						let buffer = Buffer.from(res.base64img, 'base64')
						fs.writeFileSync(ranp, buffer, (err) => {
							if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
						})
						exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
							fs.unlinkSync(ranp)
							if (err) return reply(mess.error.stick)
							frnky.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: mek })
						})
					})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await frnky.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								frnky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
				} else {
					reply(`Kirim gambar/Video minimal 6 detik🗿 dengan caption ${prefix}sticker / ${prefix}sgif ❗`)
				}
				break
        ///FUN
			case 'gtts':
			case 'tts':
				if (args.length < 1) return frnky.sendMessage(from, 'Diperlukan Code bahasa kak, Contoh ${prefix}gtts id [text kakak](•‿•)', text, { quoted: mek })
				const gtts = require('./lib/gtts')(args[0])
				if (args.length < 2) return frnky.sendMessage(from, '𝗧𝗲𝗸𝘀 𝘆𝗮𝗻𝗴 𝗺𝗮𝘂 𝗱𝗶𝗷𝗮𝗱𝗶𝗶𝗻 𝘀𝘂𝗮𝗿𝗮 𝗺𝗮𝗻𝗮 𝘁𝗼𝗱? 𝘁𝘆𝘁𝗱 𝗸𝗮𝗵?', text, { quoted: mek })
				dtt = body.slice(8)
				ranm = getRandom('.mp3')
				rano = getRandom('.ogg')
				dtt.length > 300
					? reply('𝗜𝗱𝗶𝗵 𝗻𝗴𝗲𝗹𝘂𝗻𝗷𝗮𝗸 𝗻𝗴𝗲𝗻𝘁𝗼𝗱, 𝘁𝗲𝗸𝘀𝗻𝘆𝗮 𝗷𝗮𝗻𝗴𝗮𝗻 𝗸𝗲𝗽𝗮𝗻𝗷𝗮𝗻𝗴𝗮𝗻 😤')
					: gtts.save(ranm, dtt, function () {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('𝗬𝗲𝗮𝗵 𝗴𝗮𝗴𝗮𝗹 ;(, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮𝗵 𝘁𝗼𝗱 ^_^')
							frnky.sendMessage(from, buff, audio, { quoted: mek, ptt: true })
							fs.unlinkSync(rano)
						})
					})
				break
    ///STICKER 2
    case 'stiker2':
  case 'sticker2':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await frnky.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('Franky', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									frnky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
								/*frnky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await frnky.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(` Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('Franky', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									frnky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								/*frnky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await frnky.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
									if (error) return reply(mess.error.stick)
									frnky.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
									fs.unlinkSync(ranw)
								})
								//frnky.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await frnky.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								frnky.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
    
          ///MAKER
             case 'quotemaker':
					var ghh = body.slice(12)
					var quote = ghh.split("|")[0];
					var wm = ghh.split("|")[1];
					const pref = `Usage: \n${prefix}quotemaker teks|watermark\n\nEx :\n${prefix}quotemaker kata"mutiara:v|-Franky`
					if (args.length < 1) return reply(pref)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=theme`, {method: 'get'})
					buffealr = await getBuffer(anu.result)
					frnky.sendMessage(from, buffealr, image, {caption: 'done bruh...', quoted: mek})
					break
           ///INFO
			case 'setprefix':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `SETPREFIX`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				prefix = args[0]
				frnky.sendMessage(from, `Succes Mengganti Prefix : ${prefix}`, MessageType.text, selepbot)
				break
          ///INFO
			case 'setreply':
			case 'setfake':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `SETREPLY`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				fake = args[0]
				frnky.sendMessage(from, `Succes Mengganti Conversation Fake : ${fake}`, MessageType.text, selepbot)
				break
           ///INFO
			case 'setnumber':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `SETNUMBER`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				numbernye = args[0]
				frnky.sendMessage(from, `Succes Mengganti Number Conversation : ${numbernye}`, MessageType.text, selepbot)
				break
            ///INFO
			case 'settarget':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `SETTARGET`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (args.length < 1) return
				targetprivate = args[0]
				frnky.sendMessage(from, `Succes Mengganti target Private Fake Reply : ${targetprivate}`, MessageType.text, selepbot)
				break
             ///MAKER
                 case 'ttp':
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/ttp?text=${body.slice(5)}&apikey=${tobzkey}`)
				res = await getBase64(anu.base64)
				frnky.sendMessage(from, res, sticker, {quoted:mek})
				break
            ///GROUP
			case 'tagme':
				var nom = mek.participant
				const tag = {
					text: `@${nom.split("@s.whatsapp.net")[0]} Ku tag kau sayang❤️🗿!`,
					contextInfo: { mentionedJid: [nom] }
				}
				frnky.sendMessage(from, tag, text, { quoted: mek })
				break
          ///GROUP
			case 'tagall':
				if (!isGroup) return reply(mess.only.group)
				if (!isGroupAdmins) return reply(mess.only.admin)
				members_id = []
				teks = (args.length > 1) ? body.slice(8).trim() : ''
				teks += '\n\n'
				for (let mem of groupMembers) {
					teks += `# @${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
				}
				mentions(teks, members_id, true)
				break
          ///INFO
			case 'clearall':
				if (!isOwner) return reply('lu owner aku?')
				anu = await frnky.chats.all()
				frnky.setMaxListeners(25)
				for (let _ of anu) {
					frnky.deleteChat(_.jid)
				}
				reply('SUKSES :)')
				break
    ///INFO
			case 'block':
				if (!isGroup) return reply(mess.only.group)
				if (!isOwner) return reply(mess.only.ownerB)
				frnky.blockUser(`${body.slice(7)}@c.us`, "add")
				frnky.sendMessage(from, `𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝗗𝗶𝘁𝗲𝗿𝗶𝗺𝗮, 𝗺𝗲𝗺𝗯𝗹𝗼𝗸𝗶𝗿 ${body.slice(7)}@c.us`, text)
				break
     ///INFO
			case 'unblock':
				if (!isGroup) return reply(mess.only.group)
				if (!isOwner) return reply(mess.only.ownerB)
				frnky.blockUser(`${body.slice(9)}@c.us`, "remove")
				frnky.sendMessage(from, `𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝗗𝗶𝘁𝗲𝗿𝗶𝗺𝗮, 𝗺𝗲𝗺𝗯????𝗮 ${body.slice(9)}@c.us`, text)
				break
    ///GROUP
			case 'leave':
				if (!isGroup) return reply(mess.only.group)
				frnky.frnky.leaveGroup(from, 'Cyaaa', MessageType.text)
				await frnky.frnky.leaveGroup(from, '𝗕𝘆𝗲𝗲', groupId)
				break
    ///GROUP
			case 'promote':
				if (!isGroup) return reply(mess.only.group)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				if (mentioned.length > 1) {
					teks = 'Perintah di terima, Promote :\n'
					for (let _ of mentioned) {
						teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					frnky.groupMakeAdmin(from, mentioned)
				} else {
					mentions(`Perintah di terima, Promote : @${mentioned[0].split('@')[0]}`, mentioned, true)
					frnky.groupMakeAdmin(from, mentioned)
				}
				break
     ///GROUP
			case 'demote':
				if (!isGroup) return reply(mess.only.group)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				if (mentioned.length > 1) {
					teks = 'Perintah di terima, Demote :\n'
					for (let _ of mentioned) {
						teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					frnky.groupDemoteAdmin(from, mentioned)
				} else {
					mentions(`Perintah di terima, Demote : @${mentioned[0].split('@')[0]}`, mentioned, true)
					frnky.groupDemoteAdmin(from, mentioned)
				}
				break
      ///GROUP
			case 'listadmin':
				if (!isGroup) return reply(mess.only.group)
				teks = `LIST ADMIN DI GROUP*${groupMetadata.subject}*\nTOTAL : ${groupAdmins.length}\n\n`
				no = 0
				for (let admon of groupAdmins) {
					no += 1
					teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
				}
				mentions(teks, groupAdmins, true)
				break
       ///MAKER
			case 'toimg':
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${fake}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot3 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				{
					if (!isQuotedSticker) return reply('stickernya mana block!')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await frnky.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('itu sticker?')
						buffer = fs.readFileSync(ran)
						frnky.sendMessage(from, buffer, image, { caption: 'Done bruhh' })
						fs.unlinkSync(ran)
					});
				}
				break
			///INFO
			case 'clone':
				if (!isGroup) return reply(mess.only.group)
				if (args.length < 1) return reply('𝘁𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗺𝗮𝘂 𝗱𝗶 𝗰𝗹𝗼𝗻𝗲!!!')
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
				try {
					pp = await frnky.getProfilePicture(id)
					buffer = await getBuffer(pp)
					frnky.updateProfilePicture(botNumber, buffer)
					mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
				} catch (e) {
					reply('𝗬𝗲𝗮𝗵 𝗴𝗮𝗴𝗮𝗹 ;(, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮𝗵 𝘁𝗼𝗱 ^_^')
				}
				break
         ///ANIME
			case 'wait':
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					reply(mess.wait)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					media = await frnky.downloadMediaMessage(encmedia)
					await wait(media).then(res => {
						frnky.sendMessage(from, res.video, video, { quoted: mek, caption: res.teks.trim() })
					}).catch(err => {
						reply(err)
					})
				} else {
					reply('𝗸𝗶𝗿𝗶𝗺 𝗳𝗼𝘁𝗼 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗲𝗽𝘁𝗶𝗼𝗻 𝗼𝗰𝗿')
				}
				break
			default:
			if (body.startsWith(`${prefix}${command}`)) {
				reply(`Format salah!`)
                  }
				if (isGroup && isSimi && budy != undefined) {
					console.log(budy)
					muehe = await simih(budy)
					console.log(muehe)
					reply(muehe)
				} else {
					console.log(color('[SELF-KY]', 'red'), 'Any Message ? ', color(sender.split('@')[0]))
				}
		}
	} catch (e) {
		console.log('Message : %s', color(e, 'red'))
		// console.log(e)
	}
}) 

