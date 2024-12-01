import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO posts (title, author, year) VALUES (?, ?, ?)",
            ('The way of kings', 'Brandon Sanderson', 2010)
            )

cur.execute("INSERT INTO posts (title, author, year) VALUES (?, ?, ?)",
            ('The way of kings 2', 'Brandon Sanderson', 2013)
            )

connection.commit()
connection.close()