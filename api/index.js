import express from 'express';
import dbpool from '../dbpool';

const router = express.Router();

router.get('/unassignedroles', (req, res) => {
    dbpool.getConnection( (err, connection) => {
      // Use the connection
      connection.query('CALL Get_UnassignedCollabRoles(0, 20);', (error, results, fields) => {
          res.send(results);
          connection.release();
          if (error) throw error;
          // Don't use the connection here, it has been returned to the pool.
      });
    });
});

export default router;
