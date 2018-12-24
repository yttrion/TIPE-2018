# **TELBOT**

This bot was created for a computer project from our Science school

It allows the bot to create a comunication line between two guilds where the bot is member

## **CHANGELOG**

**V  - 0.1**

    *Added credentials

    *Bot initial setup

    *Config file

**V  - 0.2**

    *Added sqlite for database

    *Added database support

**V   - 0.3**

    *Fixed node_module  => new module sqlite3 instead of sqlite

    *Command t!init initialize the bot on the guild         
    THROW CATCH ERROR
    This command inserts guild's id into the database

    *Fixed issue with identical entries with UNIQUE command in sqlite

**V   - 0.4**

    *Added port system in the database

    *Reads the t!call command and kepps caller.channel.id
    
    *MUST ADD RANDOM SELECTION

**V   - 0.5**

    *ADDED RANDOM SELECTION using the ROWID column in DB
    
    *With every initialized canal must increment randomizer 
    --> NOT AUTO YET  MUST BE AUTO

**V   - 0.6**

    *t!call command select the row.canal_id of the random selection
   
    *displays everything in the  log for debug

**V   - 0.7**

    *The t!s command allow user to send message
   
    *The t!s command throws a catch error, calledID is not defined, can use this command without any bug from the called channel tho

**V   - 0.8**

    *Changed the t!s command from SYNC to ASYNC
   
    *Created a collector for answer to be sent
    
    *Bot keeps gettinng his answer for an actual answer to send
	T!S SENDS CATCH ERROR calledID not defined tho it is in the console log

**V   - 0.9**

    * Changed type of canal_id entry in the database from INTEGER to BLOB to get real answer
    
    * calledID is modified and is not an actual entry in the db. If calledID.lenght > 15 it changes the last digit

**V   - 1.0**

    *Fixed previous errors by switching type of canal_id in the database from BLOB to TEXT because the get() function need a string (with no limit of lenght)
		integer can't be longer than 15 digits.
   
    *t!s command switched from ASYNC to SYNC cause there's no need to overload process anymore.
    
    *Deleted port. Will be implemented inn the next updates

**V   - 1.1**

    *Added multi chat support
    
**V   - 1.2**

    *Fixed the multi-chat. Now it uses the channel's name instead of the id

    *Added the t!hang function

**V   - 1.3**
    
    *Fixed the multi-chat. It handles 10 conversations at the same time
    
    *Edited the t!hang command

**V   - 1.4**

    *Fixed temp issues
    
    *Fixed t!hang command that was using a undefined variable
    
    *Fixed the hang command effect. It sets call_status and port to 0
    
**V   - 1.5**

    *Added "Do Not Disturb" mode!
