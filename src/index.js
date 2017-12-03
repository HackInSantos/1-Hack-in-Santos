const DB = require('db');

// Test Notification
const Notification = require('./notifications')();

Notification.send('ugh');

// Colocar um texto padrão para projetos novos, aprovados e reprovados: 
//(Vereador tal criou projeto tal que está pendente de aprovação, confira aqui: link e dê aquele like se gostou do projeto)
//(Foi aprovado projeto tal de vereador tal - link)
//(Foi reprovado projeto tal de vereador tal - link)