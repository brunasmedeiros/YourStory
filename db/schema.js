'use strict';

const Sequelize = require('sequelize');
const db = require('./config');

// TODO: look into putting sync inside authenticate promise
db
  .authenticate()
  .then(() => {
    console.log('Connection established from schema');
  })
  .catch((err) => {
    console.log('Unable to connect: ', err);
  });

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chrome_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: Sequelize.STRING,
});

const Url = db.define('url', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: Sequelize.STRING,
});

const Domain = db.define('domain', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  domain: {
    type: Sequelize.STRING,
    // unique: true,
  },
});

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const DateTable = db.define('date', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dateOnly: {
    type: Sequelize.DATEONLY,
    unique: true,
  },
});

const UserDomain = db.define('users_domains', {
  count: Sequelize.INTEGER,
});

const DateDomain = db.define('dates_domains', {
  count: Sequelize.INTEGER,
});

Domain.belongsToMany(User, { through: UserDomain, foreignKey: 'domainId' });
User.belongsToMany(Domain, { through: UserDomain, foreignKey: 'userId' });

User.hasMany(Url);
Url.belongsTo(User);

Category.hasMany(Domain, { as: 'Sites' });
Domain.belongsTo(Category);
// User.hasMany(Domain, { as: 'Sitess' });
Domain.belongsTo(User);

Domain.belongsToMany(DateTable, { through: DateDomain, foreignKey: 'domainId' });
DateTable.belongsToMany(Domain, { through: DateDomain, foreignKey: 'dateId' });

db
  .sync({ force: false })

  .then(() => {
    console.log('All tables created');
  //    return User.create({ username: 'Lizzie Shipton', chrome_id: '111543263518472855795' })
  //    .then(() => {
  //      console.log('User created');
  //    })
  //    .catch((err) =>{
  //      console.log(err);
  //    });
  //  })
  //  .then(() =>{
  //    return Domain.bulkCreate([
  //      { domain: 'google.com', userId: 1 },
  //      { domain: 'yelp.com', userId: 1 },
  //      { domain: 'facebook.com', userId: 1 },
  //      { domain: 'wsj.com', userId: 1 },
  //    ])
  //    .then(() => {
  //      console.log('Domain Table created');
  //    })
  //    .catch((err) =>{
  //      console.log(err);
  //    });
  //  })
  //  .then(() =>{
  //   return DateTable.bulkCreate([
  //     { dateOnly: '2016-11-23' },
  //     { dateOnly: '2016-11-22' },
  //     { dateOnly: '2016-11-21' },
  //     { dateOnly: '2016-11-20' },
  //     { dateOnly: '2016-11-19' },
  //   ])
  //     .then(() =>{
  //       console.log("Date Table Created")
  //     })
  //     .catch((err) =>{
  //       console.log(err);
  //     });
  //   })
  //   .then(() => {
  //     return DateDomain.bulkCreate([
  //     { domainId: 1, count: 140, dateId: 1 },
  //     { domainId: 2, count: 14, dateId: 2 },
  //     { domainId: 2, count: 24, dateId: 3 },
  //     { domainId: 3, count: 150, dateId: 4 },
  //     { domainId: 3, count: 160, dateId: 5 },
  //     ])
  //   .then(() => {
  //     console.log('DateDomain Table created');
  //   })
  //  .catch((err) => {
  //     console.log('error', err);
  //  });
})
  .catch((err) => {
    console.log("error creating tables");
  })

module.exports = {
  User: User,
  Domain: Domain,
  UserDomain: UserDomain,
  Category: Category,
  DateDomain: DateDomain,
  DateTable: DateTable,
};
