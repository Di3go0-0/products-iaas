**README.md**

---

## API de Gestión de Productos (Fragmentación Vertical)

Esta API implementa un sistema de gestión de productos distribuido en tres bases de datos lógicas (fragmentación vertical). Cada producto se compone de:

- **Descripción**: almacena `id`, `name`, `description`
- **Venta/Inventario**: almacena `id`, `unitprice`, `stock`
- **Enlace**: asocia un registro de descripción con su contraparte de venta, identificando al producto completo

### Arquitectura

```
┌───────────────────────────────────────┐
│              NestJS API              │
│ ┌─────────┐  ┌────────┐  ┌──────────┐ │
│ │Descriptions││   Sale  ││  Links    │ │
│ │ Service   ││ Service ││ Service   │ │
│ └─────────┘  └────────┘  └──────────┘ │
│      │            │             │    │
│      ▼            ▼             ▼    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│ │Postgres  │ │Postgres  │ │Postgres  ││
│ │DescriptionsDB│SaleDB   │LinksDB   ││
│ └──────────┘ └──────────┘ └──────────┘│
└───────────────────────────────────────┘
```

- **DescriptionsDbModule** (`descConn`) → `product_descriptions_db`
- **SaleDbModule** (`saleConn`) → `product_sales_db`
- **LinksDbModule** (`linksConn`) → `links_db`

Se usa TypeORM con `forRootAsync` para cada conexión, y `forFeature` en los módulos de entidad.

### Replicación (opcional)

Para alta disponibilidad y escalabilidad de lectura, puede configurarse **replicación en streaming**:

- **Primary**: `POSTGRESQL_REPLICATION_MODE=master`
- **Replica**: `POSTGRESQL_REPLICATION_MODE=slave`

TypeORM puede distribuir operaciones **write** al master y **read** a la réplica usando su opción `replication: { master:…, slaves:[…] }`.

---

## Instalación y Ejecución

1. Clona el repositorio y entra en la carpeta `api/`.

2. Crea un archivo `.env` en la raíz con las variables necesarias:

3. Levanta la base de datos con réplica:

   ```bash
   docker-compose up -d
   ```

   - Contenedor **postgres-primary** en `localhost:5433`
   - Contenedor **postgres-replica** en `localhost:5434`

4. Instala dependencias y arranca la API:

   ```bash
   npm ci
   npm run start:dev
   ```

5. Accede a Swagger en `http://localhost:3011/api/docs`.

---

## Módulos y Estructura

- **database/**

  - `descriptions-db.module.ts`
  - `sale-db.module.ts`
  - `links-db.module.ts`
  - `database.module.ts` (agregador)

- **descriptions/**

  - `product-description.entity.ts`
  - `descriptions.service.ts`
  - `descriptions.module.ts`

- **sale/**

  - `sale.entity.ts`
  - `sale.service.ts`
  - `sale.module.ts`

- **links/**

  - `product-link.entity.ts`
  - `links.service.ts`
  - `links.module.ts`

- **product/**

  - `post.products.type.ts`
  - `patch.products.type.ts`
  - `product.service.ts`
  - `product.controller.ts`
  - `product.module.ts`

- **app.module.ts**
- **main.ts**

---

## Endpoints

| Método | Ruta            | Descripción                                                                 |
| ------ | --------------- | --------------------------------------------------------------------------- |
| POST   | `/products`     | Crea un producto (inserta en 3 DBs con SAGA)                                |
| GET    | `/products`     | Lista todos los productos                                                   |
| GET    | `/products/:id` | Obtiene un producto por su `linkId` (o `descId`)                            |
| PATCH  | `/products/:id` | Actualiza parcialmente campos (`name`, `description`, `unitprice`, `stock`) |
| DELETE | `/products/:id` | Elimina un producto completo (compensaciones SAGA)                          |

---

## Patrón SAGA para Consistencia

En `ProductService`:

1. **create**

   - Crea descripción → crea venta → crea enlace
   - En `catch` deshace en orden inverso si falla alguna operación

2. **update**

   - Aplica cambios en la descripción y/o venta
   - Combina resultados para devolver el objeto completo

3. **remove**

   - Elimina enlace → venta → descripción

---

## Swagger

La documentación interactiva está disponible en:

```
http://localhost:${API_PORT}/${SWAGGER_ROUTE}
```

Allí podrás probar todos los endpoints y ver los esquemas de DTOs.

---

## Notas Finales

- **Modularidad**: cada fragmento de datos vive en su propio módulo y base.
- **Escalabilidad**: la réplica permite distribuir lecturas (o balancear carga).
- **Resiliencia**: patrón SAGA en escrituras garantiza no dejar datos huérfanos.

¡Listo para gestionar productos de forma distribuida y robusta!
