const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'userSystem',
});

app.post('/register', (req, res) => {
  const eMail = req.body.eMail;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    'INSERT INTO users (eMail, username, password) VALUES (?, ?, ?)',
    [eMail, username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

app.get('/user', (req, res) => {
  const username = req.query.username;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/allUsers', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/userId', (req, res) => {
  db.query('SELECT userId, username FROM users', [], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/addDefaultImage', (req, res) => {
  const userId = req.body.userId;

  db.query(
    'INSERT INTO useractivity (userId, imageId) VALUES (?, ?)',
    [userId, 1],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

app.put('/updateBackImage', (req, res) => {
  const userId = req.body.userId;
  const newImageId = req.body.newImageId;

  db.query(
    'UPDATE useractivity SET imageId = ? WHERE userId = ?;',
    [newImageId, userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

app.put('/editProfile', (req, res) => {
  const oldUserName = req.query.oldUserName;
  const newEMail = req.query.newEMail;
  const newUsername = req.query.newUsername;
  const newPassword = req.query.newPassword;

  db.query(
    'UPDATE users SET eMail = ?, username = ?, password = ? WHERE username = ?;',
    [newEMail, newUsername, newPassword, oldUserName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

app.get('/getUserInfo', (req, res) => {
  const username = req.query.username;
  db.query(
    'SELECT * FROM useractivity AS useract INNER JOIN users AS user ON(useract.userId = user.userId) WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/searchProfiles', (req, res) => {
  const usernameSearch = req.query;

  db.query(
    'SELECT username FROM users WHERE username LIKE "?%"',
    [usernameSearch],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/followUser', (req, res) => {
  const username = req.query.username;
  const viewUsername = req.query.viewUsername;

  db.query(
    'INSERT INTO follower (username, following) VALUES (?, ?)',
    [username, viewUsername],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/unfollowUser', (req, res) => {
  const username = req.query.username;
  const viewUsername = req.query.viewUsername;

  db.query(
    'DELETE FROM follower WHERE username = ? AND following = ?',
    [username, viewUsername],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/following', (req, res) => {
  const username = req.query.username;
  db.query(
    'SELECT * FROM follower WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/followers', (req, res) => {
  const following = req.query.viewProfile;
  db.query(
    'SELECT * FROM follower WHERE following = ?',
    [following],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/likeUser', (req, res) => {
  const username = req.query.username;
  const viewUsername = req.query.viewUsername;

  db.query(
    'INSERT INTO likes (username, likes) VALUES (?, ?)',
    [username, viewUsername],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/unlikeUser', (req, res) => {
  const username = req.query.username;
  const viewUsername = req.query.viewUsername;

  db.query(
    'DELETE FROM likes WHERE username = ? AND likes = ?',
    [username, viewUsername],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/likes', (req, res) => {
  const username = req.query.username;
  db.query('SELECT * FROM likes WHERE likes = ?', [username], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log('The server is running');
});
