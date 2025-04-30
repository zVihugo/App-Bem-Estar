import { app } from './app';
import { config } from './config/config';

app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${config.PORT}`);
});
