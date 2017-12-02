# 1-Hack-in-Santos
Desafio 

# Environment Variables

DATABASE_URL 
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME


#How Start Project

You'll need to have the following tools installed for this to work

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](http://vagrantup.com/)

#start Postgres

To get the server going execute the following in the directory:

    script/database up or vagrant up

To shutdown the database server do the following:

    script/database down or vagrant halt

To destroy the database server do the following (this will remove all data):

    script/database destroy or vagrant destroy


# How connect from client

Download Dbeaver:
	https://dbeaver.jkiss.org/download/	

Create a new connection

Host: localhost
Port: 5432
Login: postgre
Senha: pass