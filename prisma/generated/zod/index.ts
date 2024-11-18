import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UtilisateurScalarFieldEnumSchema = z.enum(['id','uid','nom','prenom','role']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','nom','description']);

export const HabitatScalarFieldEnumSchema = z.enum(['id','nom','description','images']);

export const RaceScalarFieldEnumSchema = z.enum(['id','label']);

export const AnimalScalarFieldEnumSchema = z.enum(['id','prenom','raceId','images','habitatId']);

export const RapportScalarFieldEnumSchema = z.enum(['id','etat','date','detail','animalId','veterinaireId']);

export const NourritureScalarFieldEnumSchema = z.enum(['id','label','grammage','date','employeId','animalId']);

export const AvisScalarFieldEnumSchema = z.enum(['id','pseudo','commentaire','isVisible','habitatId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleEnumSchema = z.enum(['Veterinaire','Employee']);

export type RoleEnumType = `${z.infer<typeof RoleEnumSchema>}`

export const EtatAnimalSchema = z.enum(['BonneSante','SousObservation','EnSoins','EnQuarantaine','Repos']);

export type EtatAnimalType = `${z.infer<typeof EtatAnimalSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// UTILISATEUR SCHEMA
/////////////////////////////////////////

export const UtilisateurSchema = z.object({
  role: RoleEnumSchema,
  id: z.number().int(),
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
})

export type Utilisateur = z.infer<typeof UtilisateurSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.number().int(),
  nom: z.string(),
  description: z.string(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// HABITAT SCHEMA
/////////////////////////////////////////

export const HabitatSchema = z.object({
  id: z.number().int(),
  nom: z.string(),
  description: z.string(),
  images: z.string().array(),
})

export type Habitat = z.infer<typeof HabitatSchema>

/////////////////////////////////////////
// RACE SCHEMA
/////////////////////////////////////////

export const RaceSchema = z.object({
  id: z.number().int(),
  label: z.string(),
})

export type Race = z.infer<typeof RaceSchema>

/////////////////////////////////////////
// ANIMAL SCHEMA
/////////////////////////////////////////

export const AnimalSchema = z.object({
  id: z.number().int(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.string().array(),
  habitatId: z.number().int(),
})

export type Animal = z.infer<typeof AnimalSchema>

/////////////////////////////////////////
// RAPPORT SCHEMA
/////////////////////////////////////////

export const RapportSchema = z.object({
  etat: EtatAnimalSchema,
  id: z.number().int(),
  date: z.coerce.date(),
  detail: z.string().nullable(),
  animalId: z.number().int(),
  veterinaireId: z.number().int(),
})

export type Rapport = z.infer<typeof RapportSchema>

/////////////////////////////////////////
// NOURRITURE SCHEMA
/////////////////////////////////////////

export const NourritureSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employeId: z.number().int(),
  animalId: z.number().int(),
})

export type Nourriture = z.infer<typeof NourritureSchema>

/////////////////////////////////////////
// AVIS SCHEMA
/////////////////////////////////////////

export const AvisSchema = z.object({
  id: z.number().int(),
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean(),
  habitatId: z.number().int(),
})

export type Avis = z.infer<typeof AvisSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// UTILISATEUR
//------------------------------------------------------

export const UtilisateurIncludeSchema: z.ZodType<Prisma.UtilisateurInclude> = z.object({
  Rapport: z.union([z.boolean(),z.lazy(() => RapportFindManyArgsSchema)]).optional(),
  Nouriture: z.union([z.boolean(),z.lazy(() => NourritureFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UtilisateurCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UtilisateurArgsSchema: z.ZodType<Prisma.UtilisateurDefaultArgs> = z.object({
  select: z.lazy(() => UtilisateurSelectSchema).optional(),
  include: z.lazy(() => UtilisateurIncludeSchema).optional(),
}).strict();

export const UtilisateurCountOutputTypeArgsSchema: z.ZodType<Prisma.UtilisateurCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UtilisateurCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UtilisateurCountOutputTypeSelectSchema: z.ZodType<Prisma.UtilisateurCountOutputTypeSelect> = z.object({
  Rapport: z.boolean().optional(),
  Nouriture: z.boolean().optional(),
}).strict();

export const UtilisateurSelectSchema: z.ZodType<Prisma.UtilisateurSelect> = z.object({
  id: z.boolean().optional(),
  uid: z.boolean().optional(),
  nom: z.boolean().optional(),
  prenom: z.boolean().optional(),
  role: z.boolean().optional(),
  Rapport: z.union([z.boolean(),z.lazy(() => RapportFindManyArgsSchema)]).optional(),
  Nouriture: z.union([z.boolean(),z.lazy(() => NourritureFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UtilisateurCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  nom: z.boolean().optional(),
  description: z.boolean().optional(),
}).strict()

// HABITAT
//------------------------------------------------------

export const HabitatIncludeSchema: z.ZodType<Prisma.HabitatInclude> = z.object({
  animaux: z.union([z.boolean(),z.lazy(() => AnimalFindManyArgsSchema)]).optional(),
  avis: z.union([z.boolean(),z.lazy(() => AvisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HabitatCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HabitatArgsSchema: z.ZodType<Prisma.HabitatDefaultArgs> = z.object({
  select: z.lazy(() => HabitatSelectSchema).optional(),
  include: z.lazy(() => HabitatIncludeSchema).optional(),
}).strict();

export const HabitatCountOutputTypeArgsSchema: z.ZodType<Prisma.HabitatCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => HabitatCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HabitatCountOutputTypeSelectSchema: z.ZodType<Prisma.HabitatCountOutputTypeSelect> = z.object({
  animaux: z.boolean().optional(),
  avis: z.boolean().optional(),
}).strict();

export const HabitatSelectSchema: z.ZodType<Prisma.HabitatSelect> = z.object({
  id: z.boolean().optional(),
  nom: z.boolean().optional(),
  description: z.boolean().optional(),
  images: z.boolean().optional(),
  animaux: z.union([z.boolean(),z.lazy(() => AnimalFindManyArgsSchema)]).optional(),
  avis: z.union([z.boolean(),z.lazy(() => AvisFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HabitatCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RACE
//------------------------------------------------------

export const RaceIncludeSchema: z.ZodType<Prisma.RaceInclude> = z.object({
  Animal: z.union([z.boolean(),z.lazy(() => AnimalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RaceArgsSchema: z.ZodType<Prisma.RaceDefaultArgs> = z.object({
  select: z.lazy(() => RaceSelectSchema).optional(),
  include: z.lazy(() => RaceIncludeSchema).optional(),
}).strict();

export const RaceCountOutputTypeArgsSchema: z.ZodType<Prisma.RaceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RaceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RaceCountOutputTypeSelectSchema: z.ZodType<Prisma.RaceCountOutputTypeSelect> = z.object({
  Animal: z.boolean().optional(),
}).strict();

export const RaceSelectSchema: z.ZodType<Prisma.RaceSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  Animal: z.union([z.boolean(),z.lazy(() => AnimalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ANIMAL
//------------------------------------------------------

export const AnimalIncludeSchema: z.ZodType<Prisma.AnimalInclude> = z.object({
  race: z.union([z.boolean(),z.lazy(() => RaceArgsSchema)]).optional(),
  habitat: z.union([z.boolean(),z.lazy(() => HabitatArgsSchema)]).optional(),
  rapports: z.union([z.boolean(),z.lazy(() => RapportFindManyArgsSchema)]).optional(),
  nourritures: z.union([z.boolean(),z.lazy(() => NourritureFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnimalCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AnimalArgsSchema: z.ZodType<Prisma.AnimalDefaultArgs> = z.object({
  select: z.lazy(() => AnimalSelectSchema).optional(),
  include: z.lazy(() => AnimalIncludeSchema).optional(),
}).strict();

export const AnimalCountOutputTypeArgsSchema: z.ZodType<Prisma.AnimalCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AnimalCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AnimalCountOutputTypeSelectSchema: z.ZodType<Prisma.AnimalCountOutputTypeSelect> = z.object({
  rapports: z.boolean().optional(),
  nourritures: z.boolean().optional(),
}).strict();

export const AnimalSelectSchema: z.ZodType<Prisma.AnimalSelect> = z.object({
  id: z.boolean().optional(),
  prenom: z.boolean().optional(),
  raceId: z.boolean().optional(),
  images: z.boolean().optional(),
  habitatId: z.boolean().optional(),
  race: z.union([z.boolean(),z.lazy(() => RaceArgsSchema)]).optional(),
  habitat: z.union([z.boolean(),z.lazy(() => HabitatArgsSchema)]).optional(),
  rapports: z.union([z.boolean(),z.lazy(() => RapportFindManyArgsSchema)]).optional(),
  nourritures: z.union([z.boolean(),z.lazy(() => NourritureFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AnimalCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RAPPORT
//------------------------------------------------------

export const RapportIncludeSchema: z.ZodType<Prisma.RapportInclude> = z.object({
  animal: z.union([z.boolean(),z.lazy(() => AnimalArgsSchema)]).optional(),
  veterinaire: z.union([z.boolean(),z.lazy(() => UtilisateurArgsSchema)]).optional(),
}).strict()

export const RapportArgsSchema: z.ZodType<Prisma.RapportDefaultArgs> = z.object({
  select: z.lazy(() => RapportSelectSchema).optional(),
  include: z.lazy(() => RapportIncludeSchema).optional(),
}).strict();

export const RapportSelectSchema: z.ZodType<Prisma.RapportSelect> = z.object({
  id: z.boolean().optional(),
  etat: z.boolean().optional(),
  date: z.boolean().optional(),
  detail: z.boolean().optional(),
  animalId: z.boolean().optional(),
  veterinaireId: z.boolean().optional(),
  animal: z.union([z.boolean(),z.lazy(() => AnimalArgsSchema)]).optional(),
  veterinaire: z.union([z.boolean(),z.lazy(() => UtilisateurArgsSchema)]).optional(),
}).strict()

// NOURRITURE
//------------------------------------------------------

export const NourritureIncludeSchema: z.ZodType<Prisma.NourritureInclude> = z.object({
  employe: z.union([z.boolean(),z.lazy(() => UtilisateurArgsSchema)]).optional(),
  animal: z.union([z.boolean(),z.lazy(() => AnimalArgsSchema)]).optional(),
}).strict()

export const NourritureArgsSchema: z.ZodType<Prisma.NourritureDefaultArgs> = z.object({
  select: z.lazy(() => NourritureSelectSchema).optional(),
  include: z.lazy(() => NourritureIncludeSchema).optional(),
}).strict();

export const NourritureSelectSchema: z.ZodType<Prisma.NourritureSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  grammage: z.boolean().optional(),
  date: z.boolean().optional(),
  employeId: z.boolean().optional(),
  animalId: z.boolean().optional(),
  employe: z.union([z.boolean(),z.lazy(() => UtilisateurArgsSchema)]).optional(),
  animal: z.union([z.boolean(),z.lazy(() => AnimalArgsSchema)]).optional(),
}).strict()

// AVIS
//------------------------------------------------------

export const AvisIncludeSchema: z.ZodType<Prisma.AvisInclude> = z.object({
  habitat: z.union([z.boolean(),z.lazy(() => HabitatArgsSchema)]).optional(),
}).strict()

export const AvisArgsSchema: z.ZodType<Prisma.AvisDefaultArgs> = z.object({
  select: z.lazy(() => AvisSelectSchema).optional(),
  include: z.lazy(() => AvisIncludeSchema).optional(),
}).strict();

export const AvisSelectSchema: z.ZodType<Prisma.AvisSelect> = z.object({
  id: z.boolean().optional(),
  pseudo: z.boolean().optional(),
  commentaire: z.boolean().optional(),
  isVisible: z.boolean().optional(),
  habitatId: z.boolean().optional(),
  habitat: z.union([z.boolean(),z.lazy(() => HabitatArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UtilisateurWhereInputSchema: z.ZodType<Prisma.UtilisateurWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UtilisateurWhereInputSchema),z.lazy(() => UtilisateurWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UtilisateurWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UtilisateurWhereInputSchema),z.lazy(() => UtilisateurWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prenom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleEnumFilterSchema),z.lazy(() => RoleEnumSchema) ]).optional(),
  Rapport: z.lazy(() => RapportListRelationFilterSchema).optional(),
  Nouriture: z.lazy(() => NourritureListRelationFilterSchema).optional()
}).strict();

export const UtilisateurOrderByWithRelationInputSchema: z.ZodType<Prisma.UtilisateurOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  Rapport: z.lazy(() => RapportOrderByRelationAggregateInputSchema).optional(),
  Nouriture: z.lazy(() => NourritureOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UtilisateurWhereUniqueInputSchema: z.ZodType<Prisma.UtilisateurWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uid: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uid: z.string().optional(),
  AND: z.union([ z.lazy(() => UtilisateurWhereInputSchema),z.lazy(() => UtilisateurWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UtilisateurWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UtilisateurWhereInputSchema),z.lazy(() => UtilisateurWhereInputSchema).array() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prenom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleEnumFilterSchema),z.lazy(() => RoleEnumSchema) ]).optional(),
  Rapport: z.lazy(() => RapportListRelationFilterSchema).optional(),
  Nouriture: z.lazy(() => NourritureListRelationFilterSchema).optional()
}).strict());

export const UtilisateurOrderByWithAggregationInputSchema: z.ZodType<Prisma.UtilisateurOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UtilisateurCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UtilisateurAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UtilisateurMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UtilisateurMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UtilisateurSumOrderByAggregateInputSchema).optional()
}).strict();

export const UtilisateurScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UtilisateurScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UtilisateurScalarWhereWithAggregatesInputSchema),z.lazy(() => UtilisateurScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UtilisateurScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UtilisateurScalarWhereWithAggregatesInputSchema),z.lazy(() => UtilisateurScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prenom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleEnumWithAggregatesFilterSchema),z.lazy(() => RoleEnumSchema) ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const HabitatWhereInputSchema: z.ZodType<Prisma.HabitatWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HabitatWhereInputSchema),z.lazy(() => HabitatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitatWhereInputSchema),z.lazy(() => HabitatWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  animaux: z.lazy(() => AnimalListRelationFilterSchema).optional(),
  avis: z.lazy(() => AvisListRelationFilterSchema).optional()
}).strict();

export const HabitatOrderByWithRelationInputSchema: z.ZodType<Prisma.HabitatOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  animaux: z.lazy(() => AnimalOrderByRelationAggregateInputSchema).optional(),
  avis: z.lazy(() => AvisOrderByRelationAggregateInputSchema).optional()
}).strict();

export const HabitatWhereUniqueInputSchema: z.ZodType<Prisma.HabitatWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => HabitatWhereInputSchema),z.lazy(() => HabitatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitatWhereInputSchema),z.lazy(() => HabitatWhereInputSchema).array() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  animaux: z.lazy(() => AnimalListRelationFilterSchema).optional(),
  avis: z.lazy(() => AvisListRelationFilterSchema).optional()
}).strict());

export const HabitatOrderByWithAggregationInputSchema: z.ZodType<Prisma.HabitatOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HabitatCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HabitatAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HabitatMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HabitatMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HabitatSumOrderByAggregateInputSchema).optional()
}).strict();

export const HabitatScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HabitatScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HabitatScalarWhereWithAggregatesInputSchema),z.lazy(() => HabitatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitatScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitatScalarWhereWithAggregatesInputSchema),z.lazy(() => HabitatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional()
}).strict();

export const RaceWhereInputSchema: z.ZodType<Prisma.RaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Animal: z.lazy(() => AnimalListRelationFilterSchema).optional()
}).strict();

export const RaceOrderByWithRelationInputSchema: z.ZodType<Prisma.RaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  Animal: z.lazy(() => AnimalOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RaceWhereUniqueInputSchema: z.ZodType<Prisma.RaceWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceWhereInputSchema),z.lazy(() => RaceWhereInputSchema).array() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Animal: z.lazy(() => AnimalListRelationFilterSchema).optional()
}).strict());

export const RaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.RaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RaceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RaceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RaceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RaceSumOrderByAggregateInputSchema).optional()
}).strict();

export const RaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RaceScalarWhereWithAggregatesInputSchema),z.lazy(() => RaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RaceScalarWhereWithAggregatesInputSchema),z.lazy(() => RaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnimalWhereInputSchema: z.ZodType<Prisma.AnimalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnimalWhereInputSchema),z.lazy(() => AnimalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnimalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnimalWhereInputSchema),z.lazy(() => AnimalWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  prenom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  habitatId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  race: z.union([ z.lazy(() => RaceRelationFilterSchema),z.lazy(() => RaceWhereInputSchema) ]).optional(),
  habitat: z.union([ z.lazy(() => HabitatRelationFilterSchema),z.lazy(() => HabitatWhereInputSchema) ]).optional(),
  rapports: z.lazy(() => RapportListRelationFilterSchema).optional(),
  nourritures: z.lazy(() => NourritureListRelationFilterSchema).optional()
}).strict();

export const AnimalOrderByWithRelationInputSchema: z.ZodType<Prisma.AnimalOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional(),
  race: z.lazy(() => RaceOrderByWithRelationInputSchema).optional(),
  habitat: z.lazy(() => HabitatOrderByWithRelationInputSchema).optional(),
  rapports: z.lazy(() => RapportOrderByRelationAggregateInputSchema).optional(),
  nourritures: z.lazy(() => NourritureOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AnimalWhereUniqueInputSchema: z.ZodType<Prisma.AnimalWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AnimalWhereInputSchema),z.lazy(() => AnimalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnimalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnimalWhereInputSchema),z.lazy(() => AnimalWhereInputSchema).array() ]).optional(),
  prenom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  habitatId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  race: z.union([ z.lazy(() => RaceRelationFilterSchema),z.lazy(() => RaceWhereInputSchema) ]).optional(),
  habitat: z.union([ z.lazy(() => HabitatRelationFilterSchema),z.lazy(() => HabitatWhereInputSchema) ]).optional(),
  rapports: z.lazy(() => RapportListRelationFilterSchema).optional(),
  nourritures: z.lazy(() => NourritureListRelationFilterSchema).optional()
}).strict());

export const AnimalOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnimalOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AnimalCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AnimalAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnimalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnimalMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AnimalSumOrderByAggregateInputSchema).optional()
}).strict();

export const AnimalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnimalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnimalScalarWhereWithAggregatesInputSchema),z.lazy(() => AnimalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnimalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnimalScalarWhereWithAggregatesInputSchema),z.lazy(() => AnimalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  prenom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  habitatId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const RapportWhereInputSchema: z.ZodType<Prisma.RapportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RapportWhereInputSchema),z.lazy(() => RapportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RapportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RapportWhereInputSchema),z.lazy(() => RapportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  etat: z.union([ z.lazy(() => EnumEtatAnimalFilterSchema),z.lazy(() => EtatAnimalSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  detail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  animalId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  veterinaireId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  animal: z.union([ z.lazy(() => AnimalRelationFilterSchema),z.lazy(() => AnimalWhereInputSchema) ]).optional(),
  veterinaire: z.union([ z.lazy(() => UtilisateurRelationFilterSchema),z.lazy(() => UtilisateurWhereInputSchema) ]).optional(),
}).strict();

export const RapportOrderByWithRelationInputSchema: z.ZodType<Prisma.RapportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  etat: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  detail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional(),
  animal: z.lazy(() => AnimalOrderByWithRelationInputSchema).optional(),
  veterinaire: z.lazy(() => UtilisateurOrderByWithRelationInputSchema).optional()
}).strict();

export const RapportWhereUniqueInputSchema: z.ZodType<Prisma.RapportWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RapportWhereInputSchema),z.lazy(() => RapportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RapportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RapportWhereInputSchema),z.lazy(() => RapportWhereInputSchema).array() ]).optional(),
  etat: z.union([ z.lazy(() => EnumEtatAnimalFilterSchema),z.lazy(() => EtatAnimalSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  detail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  animalId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  veterinaireId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  animal: z.union([ z.lazy(() => AnimalRelationFilterSchema),z.lazy(() => AnimalWhereInputSchema) ]).optional(),
  veterinaire: z.union([ z.lazy(() => UtilisateurRelationFilterSchema),z.lazy(() => UtilisateurWhereInputSchema) ]).optional(),
}).strict());

export const RapportOrderByWithAggregationInputSchema: z.ZodType<Prisma.RapportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  etat: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  detail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RapportCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RapportAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RapportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RapportMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RapportSumOrderByAggregateInputSchema).optional()
}).strict();

export const RapportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RapportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RapportScalarWhereWithAggregatesInputSchema),z.lazy(() => RapportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RapportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RapportScalarWhereWithAggregatesInputSchema),z.lazy(() => RapportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  etat: z.union([ z.lazy(() => EnumEtatAnimalWithAggregatesFilterSchema),z.lazy(() => EtatAnimalSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  detail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  animalId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  veterinaireId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const NourritureWhereInputSchema: z.ZodType<Prisma.NourritureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NourritureWhereInputSchema),z.lazy(() => NourritureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NourritureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NourritureWhereInputSchema),z.lazy(() => NourritureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grammage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  employeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  animalId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  employe: z.union([ z.lazy(() => UtilisateurRelationFilterSchema),z.lazy(() => UtilisateurWhereInputSchema) ]).optional(),
  animal: z.union([ z.lazy(() => AnimalRelationFilterSchema),z.lazy(() => AnimalWhereInputSchema) ]).optional(),
}).strict();

export const NourritureOrderByWithRelationInputSchema: z.ZodType<Prisma.NourritureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  employe: z.lazy(() => UtilisateurOrderByWithRelationInputSchema).optional(),
  animal: z.lazy(() => AnimalOrderByWithRelationInputSchema).optional()
}).strict();

export const NourritureWhereUniqueInputSchema: z.ZodType<Prisma.NourritureWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => NourritureWhereInputSchema),z.lazy(() => NourritureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NourritureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NourritureWhereInputSchema),z.lazy(() => NourritureWhereInputSchema).array() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grammage: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  employeId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  animalId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  employe: z.union([ z.lazy(() => UtilisateurRelationFilterSchema),z.lazy(() => UtilisateurWhereInputSchema) ]).optional(),
  animal: z.union([ z.lazy(() => AnimalRelationFilterSchema),z.lazy(() => AnimalWhereInputSchema) ]).optional(),
}).strict());

export const NourritureOrderByWithAggregationInputSchema: z.ZodType<Prisma.NourritureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NourritureCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NourritureAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NourritureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NourritureMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NourritureSumOrderByAggregateInputSchema).optional()
}).strict();

export const NourritureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NourritureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NourritureScalarWhereWithAggregatesInputSchema),z.lazy(() => NourritureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NourritureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NourritureScalarWhereWithAggregatesInputSchema),z.lazy(() => NourritureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  grammage: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  employeId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  animalId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AvisWhereInputSchema: z.ZodType<Prisma.AvisWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AvisWhereInputSchema),z.lazy(() => AvisWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvisWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvisWhereInputSchema),z.lazy(() => AvisWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pseudo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentaire: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isVisible: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  habitatId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  habitat: z.union([ z.lazy(() => HabitatRelationFilterSchema),z.lazy(() => HabitatWhereInputSchema) ]).optional(),
}).strict();

export const AvisOrderByWithRelationInputSchema: z.ZodType<Prisma.AvisOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pseudo: z.lazy(() => SortOrderSchema).optional(),
  commentaire: z.lazy(() => SortOrderSchema).optional(),
  isVisible: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional(),
  habitat: z.lazy(() => HabitatOrderByWithRelationInputSchema).optional()
}).strict();

export const AvisWhereUniqueInputSchema: z.ZodType<Prisma.AvisWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AvisWhereInputSchema),z.lazy(() => AvisWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvisWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvisWhereInputSchema),z.lazy(() => AvisWhereInputSchema).array() ]).optional(),
  pseudo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentaire: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isVisible: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  habitatId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  habitat: z.union([ z.lazy(() => HabitatRelationFilterSchema),z.lazy(() => HabitatWhereInputSchema) ]).optional(),
}).strict());

export const AvisOrderByWithAggregationInputSchema: z.ZodType<Prisma.AvisOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pseudo: z.lazy(() => SortOrderSchema).optional(),
  commentaire: z.lazy(() => SortOrderSchema).optional(),
  isVisible: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AvisCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AvisAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AvisMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AvisMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AvisSumOrderByAggregateInputSchema).optional()
}).strict();

export const AvisScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AvisScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AvisScalarWhereWithAggregatesInputSchema),z.lazy(() => AvisScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvisScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvisScalarWhereWithAggregatesInputSchema),z.lazy(() => AvisScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  pseudo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  commentaire: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isVisible: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  habitatId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UtilisateurCreateInputSchema: z.ZodType<Prisma.UtilisateurCreateInput> = z.object({
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema),
  Rapport: z.lazy(() => RapportCreateNestedManyWithoutVeterinaireInputSchema).optional(),
  Nouriture: z.lazy(() => NourritureCreateNestedManyWithoutEmployeInputSchema).optional()
}).strict();

export const UtilisateurUncheckedCreateInputSchema: z.ZodType<Prisma.UtilisateurUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema),
  Rapport: z.lazy(() => RapportUncheckedCreateNestedManyWithoutVeterinaireInputSchema).optional(),
  Nouriture: z.lazy(() => NourritureUncheckedCreateNestedManyWithoutEmployeInputSchema).optional()
}).strict();

export const UtilisateurUpdateInputSchema: z.ZodType<Prisma.UtilisateurUpdateInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  Rapport: z.lazy(() => RapportUpdateManyWithoutVeterinaireNestedInputSchema).optional(),
  Nouriture: z.lazy(() => NourritureUpdateManyWithoutEmployeNestedInputSchema).optional()
}).strict();

export const UtilisateurUncheckedUpdateInputSchema: z.ZodType<Prisma.UtilisateurUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  Rapport: z.lazy(() => RapportUncheckedUpdateManyWithoutVeterinaireNestedInputSchema).optional(),
  Nouriture: z.lazy(() => NourritureUncheckedUpdateManyWithoutEmployeNestedInputSchema).optional()
}).strict();

export const UtilisateurCreateManyInputSchema: z.ZodType<Prisma.UtilisateurCreateManyInput> = z.object({
  id: z.number().int().optional(),
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema)
}).strict();

export const UtilisateurUpdateManyMutationInputSchema: z.ZodType<Prisma.UtilisateurUpdateManyMutationInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UtilisateurUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UtilisateurUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  nom: z.string(),
  description: z.string()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nom: z.string(),
  description: z.string()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nom: z.string(),
  description: z.string()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HabitatCreateInputSchema: z.ZodType<Prisma.HabitatCreateInput> = z.object({
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalCreateNestedManyWithoutHabitatInputSchema).optional(),
  avis: z.lazy(() => AvisCreateNestedManyWithoutHabitatInputSchema).optional()
}).strict();

export const HabitatUncheckedCreateInputSchema: z.ZodType<Prisma.HabitatUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalUncheckedCreateNestedManyWithoutHabitatInputSchema).optional(),
  avis: z.lazy(() => AvisUncheckedCreateNestedManyWithoutHabitatInputSchema).optional()
}).strict();

export const HabitatUpdateInputSchema: z.ZodType<Prisma.HabitatUpdateInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalUpdateManyWithoutHabitatNestedInputSchema).optional(),
  avis: z.lazy(() => AvisUpdateManyWithoutHabitatNestedInputSchema).optional()
}).strict();

export const HabitatUncheckedUpdateInputSchema: z.ZodType<Prisma.HabitatUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalUncheckedUpdateManyWithoutHabitatNestedInputSchema).optional(),
  avis: z.lazy(() => AvisUncheckedUpdateManyWithoutHabitatNestedInputSchema).optional()
}).strict();

export const HabitatCreateManyInputSchema: z.ZodType<Prisma.HabitatCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const HabitatUpdateManyMutationInputSchema: z.ZodType<Prisma.HabitatUpdateManyMutationInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const HabitatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HabitatUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const RaceCreateInputSchema: z.ZodType<Prisma.RaceCreateInput> = z.object({
  label: z.string(),
  Animal: z.lazy(() => AnimalCreateNestedManyWithoutRaceInputSchema).optional()
}).strict();

export const RaceUncheckedCreateInputSchema: z.ZodType<Prisma.RaceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  Animal: z.lazy(() => AnimalUncheckedCreateNestedManyWithoutRaceInputSchema).optional()
}).strict();

export const RaceUpdateInputSchema: z.ZodType<Prisma.RaceUpdateInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Animal: z.lazy(() => AnimalUpdateManyWithoutRaceNestedInputSchema).optional()
}).strict();

export const RaceUncheckedUpdateInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Animal: z.lazy(() => AnimalUncheckedUpdateManyWithoutRaceNestedInputSchema).optional()
}).strict();

export const RaceCreateManyInputSchema: z.ZodType<Prisma.RaceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  label: z.string()
}).strict();

export const RaceUpdateManyMutationInputSchema: z.ZodType<Prisma.RaceUpdateManyMutationInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnimalCreateInputSchema: z.ZodType<Prisma.AnimalCreateInput> = z.object({
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceCreateNestedOneWithoutAnimalInputSchema),
  habitat: z.lazy(() => HabitatCreateNestedOneWithoutAnimauxInputSchema),
  rapports: z.lazy(() => RapportCreateNestedManyWithoutAnimalInputSchema).optional(),
  nourritures: z.lazy(() => NourritureCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalUncheckedCreateInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.number().int(),
  rapports: z.lazy(() => RapportUncheckedCreateNestedManyWithoutAnimalInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUncheckedCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalUpdateInputSchema: z.ZodType<Prisma.AnimalUpdateInput> = z.object({
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceUpdateOneRequiredWithoutAnimalNestedInputSchema).optional(),
  habitat: z.lazy(() => HabitatUpdateOneRequiredWithoutAnimauxNestedInputSchema).optional(),
  rapports: z.lazy(() => RapportUpdateManyWithoutAnimalNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rapports: z.lazy(() => RapportUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalCreateManyInputSchema: z.ZodType<Prisma.AnimalCreateManyInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.number().int()
}).strict();

export const AnimalUpdateManyMutationInputSchema: z.ZodType<Prisma.AnimalUpdateManyMutationInput> = z.object({
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const AnimalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RapportCreateInputSchema: z.ZodType<Prisma.RapportCreateInput> = z.object({
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  animal: z.lazy(() => AnimalCreateNestedOneWithoutRapportsInputSchema),
  veterinaire: z.lazy(() => UtilisateurCreateNestedOneWithoutRapportInputSchema)
}).strict();

export const RapportUncheckedCreateInputSchema: z.ZodType<Prisma.RapportUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  animalId: z.number().int(),
  veterinaireId: z.number().int()
}).strict();

export const RapportUpdateInputSchema: z.ZodType<Prisma.RapportUpdateInput> = z.object({
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  animal: z.lazy(() => AnimalUpdateOneRequiredWithoutRapportsNestedInputSchema).optional(),
  veterinaire: z.lazy(() => UtilisateurUpdateOneRequiredWithoutRapportNestedInputSchema).optional()
}).strict();

export const RapportUncheckedUpdateInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  veterinaireId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RapportCreateManyInputSchema: z.ZodType<Prisma.RapportCreateManyInput> = z.object({
  id: z.number().int().optional(),
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  animalId: z.number().int(),
  veterinaireId: z.number().int()
}).strict();

export const RapportUpdateManyMutationInputSchema: z.ZodType<Prisma.RapportUpdateManyMutationInput> = z.object({
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RapportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  veterinaireId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureCreateInputSchema: z.ZodType<Prisma.NourritureCreateInput> = z.object({
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employe: z.lazy(() => UtilisateurCreateNestedOneWithoutNouritureInputSchema),
  animal: z.lazy(() => AnimalCreateNestedOneWithoutNourrituresInputSchema)
}).strict();

export const NourritureUncheckedCreateInputSchema: z.ZodType<Prisma.NourritureUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employeId: z.number().int(),
  animalId: z.number().int()
}).strict();

export const NourritureUpdateInputSchema: z.ZodType<Prisma.NourritureUpdateInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  employe: z.lazy(() => UtilisateurUpdateOneRequiredWithoutNouritureNestedInputSchema).optional(),
  animal: z.lazy(() => AnimalUpdateOneRequiredWithoutNourrituresNestedInputSchema).optional()
}).strict();

export const NourritureUncheckedUpdateInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  employeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureCreateManyInputSchema: z.ZodType<Prisma.NourritureCreateManyInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employeId: z.number().int(),
  animalId: z.number().int()
}).strict();

export const NourritureUpdateManyMutationInputSchema: z.ZodType<Prisma.NourritureUpdateManyMutationInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  employeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AvisCreateInputSchema: z.ZodType<Prisma.AvisCreateInput> = z.object({
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean(),
  habitat: z.lazy(() => HabitatCreateNestedOneWithoutAvisInputSchema)
}).strict();

export const AvisUncheckedCreateInputSchema: z.ZodType<Prisma.AvisUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean(),
  habitatId: z.number().int()
}).strict();

export const AvisUpdateInputSchema: z.ZodType<Prisma.AvisUpdateInput> = z.object({
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  habitat: z.lazy(() => HabitatUpdateOneRequiredWithoutAvisNestedInputSchema).optional()
}).strict();

export const AvisUncheckedUpdateInputSchema: z.ZodType<Prisma.AvisUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AvisCreateManyInputSchema: z.ZodType<Prisma.AvisCreateManyInput> = z.object({
  id: z.number().int().optional(),
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean(),
  habitatId: z.number().int()
}).strict();

export const AvisUpdateManyMutationInputSchema: z.ZodType<Prisma.AvisUpdateManyMutationInput> = z.object({
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AvisUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AvisUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumRoleEnumFilterSchema: z.ZodType<Prisma.EnumRoleEnumFilter> = z.object({
  equals: z.lazy(() => RoleEnumSchema).optional(),
  in: z.lazy(() => RoleEnumSchema).array().optional(),
  notIn: z.lazy(() => RoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => NestedEnumRoleEnumFilterSchema) ]).optional(),
}).strict();

export const RapportListRelationFilterSchema: z.ZodType<Prisma.RapportListRelationFilter> = z.object({
  every: z.lazy(() => RapportWhereInputSchema).optional(),
  some: z.lazy(() => RapportWhereInputSchema).optional(),
  none: z.lazy(() => RapportWhereInputSchema).optional()
}).strict();

export const NourritureListRelationFilterSchema: z.ZodType<Prisma.NourritureListRelationFilter> = z.object({
  every: z.lazy(() => NourritureWhereInputSchema).optional(),
  some: z.lazy(() => NourritureWhereInputSchema).optional(),
  none: z.lazy(() => NourritureWhereInputSchema).optional()
}).strict();

export const RapportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RapportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NourritureOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NourritureOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UtilisateurCountOrderByAggregateInputSchema: z.ZodType<Prisma.UtilisateurCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UtilisateurAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UtilisateurAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UtilisateurMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UtilisateurMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UtilisateurMinOrderByAggregateInputSchema: z.ZodType<Prisma.UtilisateurMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uid: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UtilisateurSumOrderByAggregateInputSchema: z.ZodType<Prisma.UtilisateurSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumRoleEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleEnumSchema).optional(),
  in: z.lazy(() => RoleEnumSchema).array().optional(),
  notIn: z.lazy(() => RoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => NestedEnumRoleEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleEnumFilterSchema).optional()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const AnimalListRelationFilterSchema: z.ZodType<Prisma.AnimalListRelationFilter> = z.object({
  every: z.lazy(() => AnimalWhereInputSchema).optional(),
  some: z.lazy(() => AnimalWhereInputSchema).optional(),
  none: z.lazy(() => AnimalWhereInputSchema).optional()
}).strict();

export const AvisListRelationFilterSchema: z.ZodType<Prisma.AvisListRelationFilter> = z.object({
  every: z.lazy(() => AvisWhereInputSchema).optional(),
  some: z.lazy(() => AvisWhereInputSchema).optional(),
  none: z.lazy(() => AvisWhereInputSchema).optional()
}).strict();

export const AnimalOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AnimalOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AvisOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AvisOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HabitatCountOrderByAggregateInputSchema: z.ZodType<Prisma.HabitatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HabitatAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HabitatAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HabitatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HabitatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HabitatMinOrderByAggregateInputSchema: z.ZodType<Prisma.HabitatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HabitatSumOrderByAggregateInputSchema: z.ZodType<Prisma.HabitatSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.RaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RaceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.RaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceSumOrderByAggregateInputSchema: z.ZodType<Prisma.RaceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RaceRelationFilterSchema: z.ZodType<Prisma.RaceRelationFilter> = z.object({
  is: z.lazy(() => RaceWhereInputSchema).optional(),
  isNot: z.lazy(() => RaceWhereInputSchema).optional()
}).strict();

export const HabitatRelationFilterSchema: z.ZodType<Prisma.HabitatRelationFilter> = z.object({
  is: z.lazy(() => HabitatWhereInputSchema).optional(),
  isNot: z.lazy(() => HabitatWhereInputSchema).optional()
}).strict();

export const AnimalCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnimalCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnimalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AnimalAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnimalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnimalMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnimalMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnimalMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  prenom: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnimalSumOrderByAggregateInputSchema: z.ZodType<Prisma.AnimalSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  raceId: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEtatAnimalFilterSchema: z.ZodType<Prisma.EnumEtatAnimalFilter> = z.object({
  equals: z.lazy(() => EtatAnimalSchema).optional(),
  in: z.lazy(() => EtatAnimalSchema).array().optional(),
  notIn: z.lazy(() => EtatAnimalSchema).array().optional(),
  not: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => NestedEnumEtatAnimalFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AnimalRelationFilterSchema: z.ZodType<Prisma.AnimalRelationFilter> = z.object({
  is: z.lazy(() => AnimalWhereInputSchema).optional(),
  isNot: z.lazy(() => AnimalWhereInputSchema).optional()
}).strict();

export const UtilisateurRelationFilterSchema: z.ZodType<Prisma.UtilisateurRelationFilter> = z.object({
  is: z.lazy(() => UtilisateurWhereInputSchema).optional(),
  isNot: z.lazy(() => UtilisateurWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const RapportCountOrderByAggregateInputSchema: z.ZodType<Prisma.RapportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  etat: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RapportAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RapportAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RapportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RapportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  etat: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RapportMinOrderByAggregateInputSchema: z.ZodType<Prisma.RapportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  etat: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RapportSumOrderByAggregateInputSchema: z.ZodType<Prisma.RapportSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional(),
  veterinaireId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEtatAnimalWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEtatAnimalWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EtatAnimalSchema).optional(),
  in: z.lazy(() => EtatAnimalSchema).array().optional(),
  notIn: z.lazy(() => EtatAnimalSchema).array().optional(),
  not: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => NestedEnumEtatAnimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEtatAnimalFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEtatAnimalFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NourritureCountOrderByAggregateInputSchema: z.ZodType<Prisma.NourritureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NourritureAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NourritureAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NourritureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NourritureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NourritureMinOrderByAggregateInputSchema: z.ZodType<Prisma.NourritureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NourritureSumOrderByAggregateInputSchema: z.ZodType<Prisma.NourritureSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  grammage: z.lazy(() => SortOrderSchema).optional(),
  employeId: z.lazy(() => SortOrderSchema).optional(),
  animalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const AvisCountOrderByAggregateInputSchema: z.ZodType<Prisma.AvisCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pseudo: z.lazy(() => SortOrderSchema).optional(),
  commentaire: z.lazy(() => SortOrderSchema).optional(),
  isVisible: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AvisAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AvisAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AvisMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AvisMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pseudo: z.lazy(() => SortOrderSchema).optional(),
  commentaire: z.lazy(() => SortOrderSchema).optional(),
  isVisible: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AvisMinOrderByAggregateInputSchema: z.ZodType<Prisma.AvisMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pseudo: z.lazy(() => SortOrderSchema).optional(),
  commentaire: z.lazy(() => SortOrderSchema).optional(),
  isVisible: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AvisSumOrderByAggregateInputSchema: z.ZodType<Prisma.AvisSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  habitatId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const RapportCreateNestedManyWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportCreateNestedManyWithoutVeterinaireInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateWithoutVeterinaireInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyVeterinaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NourritureCreateNestedManyWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureCreateNestedManyWithoutEmployeInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutEmployeInputSchema),z.lazy(() => NourritureCreateWithoutEmployeInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyEmployeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RapportUncheckedCreateNestedManyWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUncheckedCreateNestedManyWithoutVeterinaireInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateWithoutVeterinaireInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyVeterinaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NourritureUncheckedCreateNestedManyWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUncheckedCreateNestedManyWithoutEmployeInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutEmployeInputSchema),z.lazy(() => NourritureCreateWithoutEmployeInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyEmployeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumRoleEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleEnumSchema).optional()
}).strict();

export const RapportUpdateManyWithoutVeterinaireNestedInputSchema: z.ZodType<Prisma.RapportUpdateManyWithoutVeterinaireNestedInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateWithoutVeterinaireInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RapportUpsertWithWhereUniqueWithoutVeterinaireInputSchema),z.lazy(() => RapportUpsertWithWhereUniqueWithoutVeterinaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyVeterinaireInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RapportUpdateWithWhereUniqueWithoutVeterinaireInputSchema),z.lazy(() => RapportUpdateWithWhereUniqueWithoutVeterinaireInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RapportUpdateManyWithWhereWithoutVeterinaireInputSchema),z.lazy(() => RapportUpdateManyWithWhereWithoutVeterinaireInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RapportScalarWhereInputSchema),z.lazy(() => RapportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NourritureUpdateManyWithoutEmployeNestedInputSchema: z.ZodType<Prisma.NourritureUpdateManyWithoutEmployeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutEmployeInputSchema),z.lazy(() => NourritureCreateWithoutEmployeInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NourritureUpsertWithWhereUniqueWithoutEmployeInputSchema),z.lazy(() => NourritureUpsertWithWhereUniqueWithoutEmployeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyEmployeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NourritureUpdateWithWhereUniqueWithoutEmployeInputSchema),z.lazy(() => NourritureUpdateWithWhereUniqueWithoutEmployeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NourritureUpdateManyWithWhereWithoutEmployeInputSchema),z.lazy(() => NourritureUpdateManyWithWhereWithoutEmployeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NourritureScalarWhereInputSchema),z.lazy(() => NourritureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RapportUncheckedUpdateManyWithoutVeterinaireNestedInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateManyWithoutVeterinaireNestedInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateWithoutVeterinaireInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema),z.lazy(() => RapportCreateOrConnectWithoutVeterinaireInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RapportUpsertWithWhereUniqueWithoutVeterinaireInputSchema),z.lazy(() => RapportUpsertWithWhereUniqueWithoutVeterinaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyVeterinaireInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RapportUpdateWithWhereUniqueWithoutVeterinaireInputSchema),z.lazy(() => RapportUpdateWithWhereUniqueWithoutVeterinaireInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RapportUpdateManyWithWhereWithoutVeterinaireInputSchema),z.lazy(() => RapportUpdateManyWithWhereWithoutVeterinaireInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RapportScalarWhereInputSchema),z.lazy(() => RapportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NourritureUncheckedUpdateManyWithoutEmployeNestedInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateManyWithoutEmployeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutEmployeInputSchema),z.lazy(() => NourritureCreateWithoutEmployeInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutEmployeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NourritureUpsertWithWhereUniqueWithoutEmployeInputSchema),z.lazy(() => NourritureUpsertWithWhereUniqueWithoutEmployeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyEmployeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NourritureUpdateWithWhereUniqueWithoutEmployeInputSchema),z.lazy(() => NourritureUpdateWithWhereUniqueWithoutEmployeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NourritureUpdateManyWithWhereWithoutEmployeInputSchema),z.lazy(() => NourritureUpdateManyWithWhereWithoutEmployeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NourritureScalarWhereInputSchema),z.lazy(() => NourritureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HabitatCreateimagesInputSchema: z.ZodType<Prisma.HabitatCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const AnimalCreateNestedManyWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalCreateNestedManyWithoutHabitatInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutHabitatInputSchema),z.lazy(() => AnimalCreateWithoutHabitatInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyHabitatInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AvisCreateNestedManyWithoutHabitatInputSchema: z.ZodType<Prisma.AvisCreateNestedManyWithoutHabitatInput> = z.object({
  create: z.union([ z.lazy(() => AvisCreateWithoutHabitatInputSchema),z.lazy(() => AvisCreateWithoutHabitatInputSchema).array(),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvisCreateManyHabitatInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnimalUncheckedCreateNestedManyWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateNestedManyWithoutHabitatInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutHabitatInputSchema),z.lazy(() => AnimalCreateWithoutHabitatInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyHabitatInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AvisUncheckedCreateNestedManyWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUncheckedCreateNestedManyWithoutHabitatInput> = z.object({
  create: z.union([ z.lazy(() => AvisCreateWithoutHabitatInputSchema),z.lazy(() => AvisCreateWithoutHabitatInputSchema).array(),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvisCreateManyHabitatInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HabitatUpdateimagesInputSchema: z.ZodType<Prisma.HabitatUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const AnimalUpdateManyWithoutHabitatNestedInputSchema: z.ZodType<Prisma.AnimalUpdateManyWithoutHabitatNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutHabitatInputSchema),z.lazy(() => AnimalCreateWithoutHabitatInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnimalUpsertWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AnimalUpsertWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyHabitatInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnimalUpdateWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AnimalUpdateWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnimalUpdateManyWithWhereWithoutHabitatInputSchema),z.lazy(() => AnimalUpdateManyWithWhereWithoutHabitatInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnimalScalarWhereInputSchema),z.lazy(() => AnimalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AvisUpdateManyWithoutHabitatNestedInputSchema: z.ZodType<Prisma.AvisUpdateManyWithoutHabitatNestedInput> = z.object({
  create: z.union([ z.lazy(() => AvisCreateWithoutHabitatInputSchema),z.lazy(() => AvisCreateWithoutHabitatInputSchema).array(),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AvisUpsertWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AvisUpsertWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvisCreateManyHabitatInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AvisUpdateWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AvisUpdateWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AvisUpdateManyWithWhereWithoutHabitatInputSchema),z.lazy(() => AvisUpdateManyWithWhereWithoutHabitatInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AvisScalarWhereInputSchema),z.lazy(() => AvisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnimalUncheckedUpdateManyWithoutHabitatNestedInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateManyWithoutHabitatNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutHabitatInputSchema),z.lazy(() => AnimalCreateWithoutHabitatInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnimalUpsertWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AnimalUpsertWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyHabitatInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnimalUpdateWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AnimalUpdateWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnimalUpdateManyWithWhereWithoutHabitatInputSchema),z.lazy(() => AnimalUpdateManyWithWhereWithoutHabitatInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnimalScalarWhereInputSchema),z.lazy(() => AnimalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AvisUncheckedUpdateManyWithoutHabitatNestedInputSchema: z.ZodType<Prisma.AvisUncheckedUpdateManyWithoutHabitatNestedInput> = z.object({
  create: z.union([ z.lazy(() => AvisCreateWithoutHabitatInputSchema),z.lazy(() => AvisCreateWithoutHabitatInputSchema).array(),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema),z.lazy(() => AvisCreateOrConnectWithoutHabitatInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AvisUpsertWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AvisUpsertWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AvisCreateManyHabitatInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AvisWhereUniqueInputSchema),z.lazy(() => AvisWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AvisUpdateWithWhereUniqueWithoutHabitatInputSchema),z.lazy(() => AvisUpdateWithWhereUniqueWithoutHabitatInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AvisUpdateManyWithWhereWithoutHabitatInputSchema),z.lazy(() => AvisUpdateManyWithWhereWithoutHabitatInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AvisScalarWhereInputSchema),z.lazy(() => AvisScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnimalCreateNestedManyWithoutRaceInputSchema: z.ZodType<Prisma.AnimalCreateNestedManyWithoutRaceInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutRaceInputSchema),z.lazy(() => AnimalCreateWithoutRaceInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyRaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnimalUncheckedCreateNestedManyWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateNestedManyWithoutRaceInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutRaceInputSchema),z.lazy(() => AnimalCreateWithoutRaceInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyRaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnimalUpdateManyWithoutRaceNestedInputSchema: z.ZodType<Prisma.AnimalUpdateManyWithoutRaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutRaceInputSchema),z.lazy(() => AnimalCreateWithoutRaceInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnimalUpsertWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => AnimalUpsertWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyRaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnimalUpdateWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => AnimalUpdateWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnimalUpdateManyWithWhereWithoutRaceInputSchema),z.lazy(() => AnimalUpdateManyWithWhereWithoutRaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnimalScalarWhereInputSchema),z.lazy(() => AnimalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnimalUncheckedUpdateManyWithoutRaceNestedInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateManyWithoutRaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutRaceInputSchema),z.lazy(() => AnimalCreateWithoutRaceInputSchema).array(),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema),z.lazy(() => AnimalCreateOrConnectWithoutRaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnimalUpsertWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => AnimalUpsertWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnimalCreateManyRaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnimalWhereUniqueInputSchema),z.lazy(() => AnimalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnimalUpdateWithWhereUniqueWithoutRaceInputSchema),z.lazy(() => AnimalUpdateWithWhereUniqueWithoutRaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnimalUpdateManyWithWhereWithoutRaceInputSchema),z.lazy(() => AnimalUpdateManyWithWhereWithoutRaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnimalScalarWhereInputSchema),z.lazy(() => AnimalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnimalCreateimagesInputSchema: z.ZodType<Prisma.AnimalCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const RaceCreateNestedOneWithoutAnimalInputSchema: z.ZodType<Prisma.RaceCreateNestedOneWithoutAnimalInput> = z.object({
  create: z.union([ z.lazy(() => RaceCreateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedCreateWithoutAnimalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RaceCreateOrConnectWithoutAnimalInputSchema).optional(),
  connect: z.lazy(() => RaceWhereUniqueInputSchema).optional()
}).strict();

export const HabitatCreateNestedOneWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatCreateNestedOneWithoutAnimauxInput> = z.object({
  create: z.union([ z.lazy(() => HabitatCreateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAnimauxInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HabitatCreateOrConnectWithoutAnimauxInputSchema).optional(),
  connect: z.lazy(() => HabitatWhereUniqueInputSchema).optional()
}).strict();

export const RapportCreateNestedManyWithoutAnimalInputSchema: z.ZodType<Prisma.RapportCreateNestedManyWithoutAnimalInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutAnimalInputSchema),z.lazy(() => RapportCreateWithoutAnimalInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyAnimalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NourritureCreateNestedManyWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureCreateNestedManyWithoutAnimalInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutAnimalInputSchema),z.lazy(() => NourritureCreateWithoutAnimalInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyAnimalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RapportUncheckedCreateNestedManyWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUncheckedCreateNestedManyWithoutAnimalInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutAnimalInputSchema),z.lazy(() => RapportCreateWithoutAnimalInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyAnimalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NourritureUncheckedCreateNestedManyWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUncheckedCreateNestedManyWithoutAnimalInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutAnimalInputSchema),z.lazy(() => NourritureCreateWithoutAnimalInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyAnimalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnimalUpdateimagesInputSchema: z.ZodType<Prisma.AnimalUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RaceUpdateOneRequiredWithoutAnimalNestedInputSchema: z.ZodType<Prisma.RaceUpdateOneRequiredWithoutAnimalNestedInput> = z.object({
  create: z.union([ z.lazy(() => RaceCreateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedCreateWithoutAnimalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RaceCreateOrConnectWithoutAnimalInputSchema).optional(),
  upsert: z.lazy(() => RaceUpsertWithoutAnimalInputSchema).optional(),
  connect: z.lazy(() => RaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RaceUpdateToOneWithWhereWithoutAnimalInputSchema),z.lazy(() => RaceUpdateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedUpdateWithoutAnimalInputSchema) ]).optional(),
}).strict();

export const HabitatUpdateOneRequiredWithoutAnimauxNestedInputSchema: z.ZodType<Prisma.HabitatUpdateOneRequiredWithoutAnimauxNestedInput> = z.object({
  create: z.union([ z.lazy(() => HabitatCreateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAnimauxInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HabitatCreateOrConnectWithoutAnimauxInputSchema).optional(),
  upsert: z.lazy(() => HabitatUpsertWithoutAnimauxInputSchema).optional(),
  connect: z.lazy(() => HabitatWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HabitatUpdateToOneWithWhereWithoutAnimauxInputSchema),z.lazy(() => HabitatUpdateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedUpdateWithoutAnimauxInputSchema) ]).optional(),
}).strict();

export const RapportUpdateManyWithoutAnimalNestedInputSchema: z.ZodType<Prisma.RapportUpdateManyWithoutAnimalNestedInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutAnimalInputSchema),z.lazy(() => RapportCreateWithoutAnimalInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RapportUpsertWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => RapportUpsertWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyAnimalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RapportUpdateWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => RapportUpdateWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RapportUpdateManyWithWhereWithoutAnimalInputSchema),z.lazy(() => RapportUpdateManyWithWhereWithoutAnimalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RapportScalarWhereInputSchema),z.lazy(() => RapportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NourritureUpdateManyWithoutAnimalNestedInputSchema: z.ZodType<Prisma.NourritureUpdateManyWithoutAnimalNestedInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutAnimalInputSchema),z.lazy(() => NourritureCreateWithoutAnimalInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NourritureUpsertWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => NourritureUpsertWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyAnimalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NourritureUpdateWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => NourritureUpdateWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NourritureUpdateManyWithWhereWithoutAnimalInputSchema),z.lazy(() => NourritureUpdateManyWithWhereWithoutAnimalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NourritureScalarWhereInputSchema),z.lazy(() => NourritureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RapportUncheckedUpdateManyWithoutAnimalNestedInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateManyWithoutAnimalNestedInput> = z.object({
  create: z.union([ z.lazy(() => RapportCreateWithoutAnimalInputSchema),z.lazy(() => RapportCreateWithoutAnimalInputSchema).array(),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => RapportCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RapportUpsertWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => RapportUpsertWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RapportCreateManyAnimalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RapportWhereUniqueInputSchema),z.lazy(() => RapportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RapportUpdateWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => RapportUpdateWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RapportUpdateManyWithWhereWithoutAnimalInputSchema),z.lazy(() => RapportUpdateManyWithWhereWithoutAnimalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RapportScalarWhereInputSchema),z.lazy(() => RapportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NourritureUncheckedUpdateManyWithoutAnimalNestedInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateManyWithoutAnimalNestedInput> = z.object({
  create: z.union([ z.lazy(() => NourritureCreateWithoutAnimalInputSchema),z.lazy(() => NourritureCreateWithoutAnimalInputSchema).array(),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema),z.lazy(() => NourritureCreateOrConnectWithoutAnimalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NourritureUpsertWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => NourritureUpsertWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NourritureCreateManyAnimalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NourritureWhereUniqueInputSchema),z.lazy(() => NourritureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NourritureUpdateWithWhereUniqueWithoutAnimalInputSchema),z.lazy(() => NourritureUpdateWithWhereUniqueWithoutAnimalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NourritureUpdateManyWithWhereWithoutAnimalInputSchema),z.lazy(() => NourritureUpdateManyWithWhereWithoutAnimalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NourritureScalarWhereInputSchema),z.lazy(() => NourritureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnimalCreateNestedOneWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalCreateNestedOneWithoutRapportsInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRapportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnimalCreateOrConnectWithoutRapportsInputSchema).optional(),
  connect: z.lazy(() => AnimalWhereUniqueInputSchema).optional()
}).strict();

export const UtilisateurCreateNestedOneWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurCreateNestedOneWithoutRapportInput> = z.object({
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutRapportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UtilisateurCreateOrConnectWithoutRapportInputSchema).optional(),
  connect: z.lazy(() => UtilisateurWhereUniqueInputSchema).optional()
}).strict();

export const EnumEtatAnimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEtatAnimalFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EtatAnimalSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const AnimalUpdateOneRequiredWithoutRapportsNestedInputSchema: z.ZodType<Prisma.AnimalUpdateOneRequiredWithoutRapportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRapportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnimalCreateOrConnectWithoutRapportsInputSchema).optional(),
  upsert: z.lazy(() => AnimalUpsertWithoutRapportsInputSchema).optional(),
  connect: z.lazy(() => AnimalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnimalUpdateToOneWithWhereWithoutRapportsInputSchema),z.lazy(() => AnimalUpdateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutRapportsInputSchema) ]).optional(),
}).strict();

export const UtilisateurUpdateOneRequiredWithoutRapportNestedInputSchema: z.ZodType<Prisma.UtilisateurUpdateOneRequiredWithoutRapportNestedInput> = z.object({
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutRapportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UtilisateurCreateOrConnectWithoutRapportInputSchema).optional(),
  upsert: z.lazy(() => UtilisateurUpsertWithoutRapportInputSchema).optional(),
  connect: z.lazy(() => UtilisateurWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UtilisateurUpdateToOneWithWhereWithoutRapportInputSchema),z.lazy(() => UtilisateurUpdateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedUpdateWithoutRapportInputSchema) ]).optional(),
}).strict();

export const UtilisateurCreateNestedOneWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurCreateNestedOneWithoutNouritureInput> = z.object({
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutNouritureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UtilisateurCreateOrConnectWithoutNouritureInputSchema).optional(),
  connect: z.lazy(() => UtilisateurWhereUniqueInputSchema).optional()
}).strict();

export const AnimalCreateNestedOneWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalCreateNestedOneWithoutNourrituresInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutNourrituresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnimalCreateOrConnectWithoutNourrituresInputSchema).optional(),
  connect: z.lazy(() => AnimalWhereUniqueInputSchema).optional()
}).strict();

export const UtilisateurUpdateOneRequiredWithoutNouritureNestedInputSchema: z.ZodType<Prisma.UtilisateurUpdateOneRequiredWithoutNouritureNestedInput> = z.object({
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutNouritureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UtilisateurCreateOrConnectWithoutNouritureInputSchema).optional(),
  upsert: z.lazy(() => UtilisateurUpsertWithoutNouritureInputSchema).optional(),
  connect: z.lazy(() => UtilisateurWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UtilisateurUpdateToOneWithWhereWithoutNouritureInputSchema),z.lazy(() => UtilisateurUpdateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedUpdateWithoutNouritureInputSchema) ]).optional(),
}).strict();

export const AnimalUpdateOneRequiredWithoutNourrituresNestedInputSchema: z.ZodType<Prisma.AnimalUpdateOneRequiredWithoutNourrituresNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnimalCreateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutNourrituresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AnimalCreateOrConnectWithoutNourrituresInputSchema).optional(),
  upsert: z.lazy(() => AnimalUpsertWithoutNourrituresInputSchema).optional(),
  connect: z.lazy(() => AnimalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AnimalUpdateToOneWithWhereWithoutNourrituresInputSchema),z.lazy(() => AnimalUpdateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutNourrituresInputSchema) ]).optional(),
}).strict();

export const HabitatCreateNestedOneWithoutAvisInputSchema: z.ZodType<Prisma.HabitatCreateNestedOneWithoutAvisInput> = z.object({
  create: z.union([ z.lazy(() => HabitatCreateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAvisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HabitatCreateOrConnectWithoutAvisInputSchema).optional(),
  connect: z.lazy(() => HabitatWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const HabitatUpdateOneRequiredWithoutAvisNestedInputSchema: z.ZodType<Prisma.HabitatUpdateOneRequiredWithoutAvisNestedInput> = z.object({
  create: z.union([ z.lazy(() => HabitatCreateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAvisInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HabitatCreateOrConnectWithoutAvisInputSchema).optional(),
  upsert: z.lazy(() => HabitatUpsertWithoutAvisInputSchema).optional(),
  connect: z.lazy(() => HabitatWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HabitatUpdateToOneWithWhereWithoutAvisInputSchema),z.lazy(() => HabitatUpdateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedUpdateWithoutAvisInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleEnumFilterSchema: z.ZodType<Prisma.NestedEnumRoleEnumFilter> = z.object({
  equals: z.lazy(() => RoleEnumSchema).optional(),
  in: z.lazy(() => RoleEnumSchema).array().optional(),
  notIn: z.lazy(() => RoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => NestedEnumRoleEnumFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumRoleEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleEnumSchema).optional(),
  in: z.lazy(() => RoleEnumSchema).array().optional(),
  notIn: z.lazy(() => RoleEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => NestedEnumRoleEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleEnumFilterSchema).optional()
}).strict();

export const NestedEnumEtatAnimalFilterSchema: z.ZodType<Prisma.NestedEnumEtatAnimalFilter> = z.object({
  equals: z.lazy(() => EtatAnimalSchema).optional(),
  in: z.lazy(() => EtatAnimalSchema).array().optional(),
  notIn: z.lazy(() => EtatAnimalSchema).array().optional(),
  not: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => NestedEnumEtatAnimalFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumEtatAnimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEtatAnimalWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EtatAnimalSchema).optional(),
  in: z.lazy(() => EtatAnimalSchema).array().optional(),
  notIn: z.lazy(() => EtatAnimalSchema).array().optional(),
  not: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => NestedEnumEtatAnimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEtatAnimalFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEtatAnimalFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const RapportCreateWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportCreateWithoutVeterinaireInput> = z.object({
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  animal: z.lazy(() => AnimalCreateNestedOneWithoutRapportsInputSchema)
}).strict();

export const RapportUncheckedCreateWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUncheckedCreateWithoutVeterinaireInput> = z.object({
  id: z.number().int().optional(),
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  animalId: z.number().int()
}).strict();

export const RapportCreateOrConnectWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportCreateOrConnectWithoutVeterinaireInput> = z.object({
  where: z.lazy(() => RapportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RapportCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema) ]),
}).strict();

export const RapportCreateManyVeterinaireInputEnvelopeSchema: z.ZodType<Prisma.RapportCreateManyVeterinaireInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RapportCreateManyVeterinaireInputSchema),z.lazy(() => RapportCreateManyVeterinaireInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NourritureCreateWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureCreateWithoutEmployeInput> = z.object({
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  animal: z.lazy(() => AnimalCreateNestedOneWithoutNourrituresInputSchema)
}).strict();

export const NourritureUncheckedCreateWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUncheckedCreateWithoutEmployeInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  animalId: z.number().int()
}).strict();

export const NourritureCreateOrConnectWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureCreateOrConnectWithoutEmployeInput> = z.object({
  where: z.lazy(() => NourritureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NourritureCreateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema) ]),
}).strict();

export const NourritureCreateManyEmployeInputEnvelopeSchema: z.ZodType<Prisma.NourritureCreateManyEmployeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NourritureCreateManyEmployeInputSchema),z.lazy(() => NourritureCreateManyEmployeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RapportUpsertWithWhereUniqueWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUpsertWithWhereUniqueWithoutVeterinaireInput> = z.object({
  where: z.lazy(() => RapportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RapportUpdateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedUpdateWithoutVeterinaireInputSchema) ]),
  create: z.union([ z.lazy(() => RapportCreateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedCreateWithoutVeterinaireInputSchema) ]),
}).strict();

export const RapportUpdateWithWhereUniqueWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUpdateWithWhereUniqueWithoutVeterinaireInput> = z.object({
  where: z.lazy(() => RapportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RapportUpdateWithoutVeterinaireInputSchema),z.lazy(() => RapportUncheckedUpdateWithoutVeterinaireInputSchema) ]),
}).strict();

export const RapportUpdateManyWithWhereWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUpdateManyWithWhereWithoutVeterinaireInput> = z.object({
  where: z.lazy(() => RapportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RapportUpdateManyMutationInputSchema),z.lazy(() => RapportUncheckedUpdateManyWithoutVeterinaireInputSchema) ]),
}).strict();

export const RapportScalarWhereInputSchema: z.ZodType<Prisma.RapportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RapportScalarWhereInputSchema),z.lazy(() => RapportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RapportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RapportScalarWhereInputSchema),z.lazy(() => RapportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  etat: z.union([ z.lazy(() => EnumEtatAnimalFilterSchema),z.lazy(() => EtatAnimalSchema) ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  detail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  animalId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  veterinaireId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const NourritureUpsertWithWhereUniqueWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUpsertWithWhereUniqueWithoutEmployeInput> = z.object({
  where: z.lazy(() => NourritureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NourritureUpdateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedUpdateWithoutEmployeInputSchema) ]),
  create: z.union([ z.lazy(() => NourritureCreateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutEmployeInputSchema) ]),
}).strict();

export const NourritureUpdateWithWhereUniqueWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUpdateWithWhereUniqueWithoutEmployeInput> = z.object({
  where: z.lazy(() => NourritureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NourritureUpdateWithoutEmployeInputSchema),z.lazy(() => NourritureUncheckedUpdateWithoutEmployeInputSchema) ]),
}).strict();

export const NourritureUpdateManyWithWhereWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUpdateManyWithWhereWithoutEmployeInput> = z.object({
  where: z.lazy(() => NourritureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NourritureUpdateManyMutationInputSchema),z.lazy(() => NourritureUncheckedUpdateManyWithoutEmployeInputSchema) ]),
}).strict();

export const NourritureScalarWhereInputSchema: z.ZodType<Prisma.NourritureScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NourritureScalarWhereInputSchema),z.lazy(() => NourritureScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NourritureScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NourritureScalarWhereInputSchema),z.lazy(() => NourritureScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  grammage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  employeId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  animalId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const AnimalCreateWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalCreateWithoutHabitatInput> = z.object({
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceCreateNestedOneWithoutAnimalInputSchema),
  rapports: z.lazy(() => RapportCreateNestedManyWithoutAnimalInputSchema).optional(),
  nourritures: z.lazy(() => NourritureCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalUncheckedCreateWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateWithoutHabitatInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  rapports: z.lazy(() => RapportUncheckedCreateNestedManyWithoutAnimalInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUncheckedCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalCreateOrConnectWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalCreateOrConnectWithoutHabitatInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnimalCreateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema) ]),
}).strict();

export const AnimalCreateManyHabitatInputEnvelopeSchema: z.ZodType<Prisma.AnimalCreateManyHabitatInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnimalCreateManyHabitatInputSchema),z.lazy(() => AnimalCreateManyHabitatInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AvisCreateWithoutHabitatInputSchema: z.ZodType<Prisma.AvisCreateWithoutHabitatInput> = z.object({
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean()
}).strict();

export const AvisUncheckedCreateWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUncheckedCreateWithoutHabitatInput> = z.object({
  id: z.number().int().optional(),
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean()
}).strict();

export const AvisCreateOrConnectWithoutHabitatInputSchema: z.ZodType<Prisma.AvisCreateOrConnectWithoutHabitatInput> = z.object({
  where: z.lazy(() => AvisWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AvisCreateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema) ]),
}).strict();

export const AvisCreateManyHabitatInputEnvelopeSchema: z.ZodType<Prisma.AvisCreateManyHabitatInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AvisCreateManyHabitatInputSchema),z.lazy(() => AvisCreateManyHabitatInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AnimalUpsertWithWhereUniqueWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUpsertWithWhereUniqueWithoutHabitatInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnimalUpdateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutHabitatInputSchema) ]),
  create: z.union([ z.lazy(() => AnimalCreateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutHabitatInputSchema) ]),
}).strict();

export const AnimalUpdateWithWhereUniqueWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUpdateWithWhereUniqueWithoutHabitatInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnimalUpdateWithoutHabitatInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutHabitatInputSchema) ]),
}).strict();

export const AnimalUpdateManyWithWhereWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUpdateManyWithWhereWithoutHabitatInput> = z.object({
  where: z.lazy(() => AnimalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnimalUpdateManyMutationInputSchema),z.lazy(() => AnimalUncheckedUpdateManyWithoutHabitatInputSchema) ]),
}).strict();

export const AnimalScalarWhereInputSchema: z.ZodType<Prisma.AnimalScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnimalScalarWhereInputSchema),z.lazy(() => AnimalScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnimalScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnimalScalarWhereInputSchema),z.lazy(() => AnimalScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  prenom: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  raceId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  habitatId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const AvisUpsertWithWhereUniqueWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUpsertWithWhereUniqueWithoutHabitatInput> = z.object({
  where: z.lazy(() => AvisWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AvisUpdateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedUpdateWithoutHabitatInputSchema) ]),
  create: z.union([ z.lazy(() => AvisCreateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedCreateWithoutHabitatInputSchema) ]),
}).strict();

export const AvisUpdateWithWhereUniqueWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUpdateWithWhereUniqueWithoutHabitatInput> = z.object({
  where: z.lazy(() => AvisWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AvisUpdateWithoutHabitatInputSchema),z.lazy(() => AvisUncheckedUpdateWithoutHabitatInputSchema) ]),
}).strict();

export const AvisUpdateManyWithWhereWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUpdateManyWithWhereWithoutHabitatInput> = z.object({
  where: z.lazy(() => AvisScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AvisUpdateManyMutationInputSchema),z.lazy(() => AvisUncheckedUpdateManyWithoutHabitatInputSchema) ]),
}).strict();

export const AvisScalarWhereInputSchema: z.ZodType<Prisma.AvisScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AvisScalarWhereInputSchema),z.lazy(() => AvisScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AvisScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AvisScalarWhereInputSchema),z.lazy(() => AvisScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pseudo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentaire: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isVisible: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  habitatId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const AnimalCreateWithoutRaceInputSchema: z.ZodType<Prisma.AnimalCreateWithoutRaceInput> = z.object({
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitat: z.lazy(() => HabitatCreateNestedOneWithoutAnimauxInputSchema),
  rapports: z.lazy(() => RapportCreateNestedManyWithoutAnimalInputSchema).optional(),
  nourritures: z.lazy(() => NourritureCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalUncheckedCreateWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateWithoutRaceInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.number().int(),
  rapports: z.lazy(() => RapportUncheckedCreateNestedManyWithoutAnimalInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUncheckedCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalCreateOrConnectWithoutRaceInputSchema: z.ZodType<Prisma.AnimalCreateOrConnectWithoutRaceInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnimalCreateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema) ]),
}).strict();

export const AnimalCreateManyRaceInputEnvelopeSchema: z.ZodType<Prisma.AnimalCreateManyRaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnimalCreateManyRaceInputSchema),z.lazy(() => AnimalCreateManyRaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AnimalUpsertWithWhereUniqueWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUpsertWithWhereUniqueWithoutRaceInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnimalUpdateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutRaceInputSchema) ]),
  create: z.union([ z.lazy(() => AnimalCreateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRaceInputSchema) ]),
}).strict();

export const AnimalUpdateWithWhereUniqueWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUpdateWithWhereUniqueWithoutRaceInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnimalUpdateWithoutRaceInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutRaceInputSchema) ]),
}).strict();

export const AnimalUpdateManyWithWhereWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUpdateManyWithWhereWithoutRaceInput> = z.object({
  where: z.lazy(() => AnimalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnimalUpdateManyMutationInputSchema),z.lazy(() => AnimalUncheckedUpdateManyWithoutRaceInputSchema) ]),
}).strict();

export const RaceCreateWithoutAnimalInputSchema: z.ZodType<Prisma.RaceCreateWithoutAnimalInput> = z.object({
  label: z.string()
}).strict();

export const RaceUncheckedCreateWithoutAnimalInputSchema: z.ZodType<Prisma.RaceUncheckedCreateWithoutAnimalInput> = z.object({
  id: z.number().int().optional(),
  label: z.string()
}).strict();

export const RaceCreateOrConnectWithoutAnimalInputSchema: z.ZodType<Prisma.RaceCreateOrConnectWithoutAnimalInput> = z.object({
  where: z.lazy(() => RaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RaceCreateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedCreateWithoutAnimalInputSchema) ]),
}).strict();

export const HabitatCreateWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatCreateWithoutAnimauxInput> = z.object({
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
  avis: z.lazy(() => AvisCreateNestedManyWithoutHabitatInputSchema).optional()
}).strict();

export const HabitatUncheckedCreateWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatUncheckedCreateWithoutAnimauxInput> = z.object({
  id: z.number().int().optional(),
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
  avis: z.lazy(() => AvisUncheckedCreateNestedManyWithoutHabitatInputSchema).optional()
}).strict();

export const HabitatCreateOrConnectWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatCreateOrConnectWithoutAnimauxInput> = z.object({
  where: z.lazy(() => HabitatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HabitatCreateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAnimauxInputSchema) ]),
}).strict();

export const RapportCreateWithoutAnimalInputSchema: z.ZodType<Prisma.RapportCreateWithoutAnimalInput> = z.object({
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  veterinaire: z.lazy(() => UtilisateurCreateNestedOneWithoutRapportInputSchema)
}).strict();

export const RapportUncheckedCreateWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUncheckedCreateWithoutAnimalInput> = z.object({
  id: z.number().int().optional(),
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  veterinaireId: z.number().int()
}).strict();

export const RapportCreateOrConnectWithoutAnimalInputSchema: z.ZodType<Prisma.RapportCreateOrConnectWithoutAnimalInput> = z.object({
  where: z.lazy(() => RapportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RapportCreateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema) ]),
}).strict();

export const RapportCreateManyAnimalInputEnvelopeSchema: z.ZodType<Prisma.RapportCreateManyAnimalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RapportCreateManyAnimalInputSchema),z.lazy(() => RapportCreateManyAnimalInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NourritureCreateWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureCreateWithoutAnimalInput> = z.object({
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employe: z.lazy(() => UtilisateurCreateNestedOneWithoutNouritureInputSchema)
}).strict();

export const NourritureUncheckedCreateWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUncheckedCreateWithoutAnimalInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employeId: z.number().int()
}).strict();

export const NourritureCreateOrConnectWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureCreateOrConnectWithoutAnimalInput> = z.object({
  where: z.lazy(() => NourritureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NourritureCreateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema) ]),
}).strict();

export const NourritureCreateManyAnimalInputEnvelopeSchema: z.ZodType<Prisma.NourritureCreateManyAnimalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NourritureCreateManyAnimalInputSchema),z.lazy(() => NourritureCreateManyAnimalInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RaceUpsertWithoutAnimalInputSchema: z.ZodType<Prisma.RaceUpsertWithoutAnimalInput> = z.object({
  update: z.union([ z.lazy(() => RaceUpdateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedUpdateWithoutAnimalInputSchema) ]),
  create: z.union([ z.lazy(() => RaceCreateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedCreateWithoutAnimalInputSchema) ]),
  where: z.lazy(() => RaceWhereInputSchema).optional()
}).strict();

export const RaceUpdateToOneWithWhereWithoutAnimalInputSchema: z.ZodType<Prisma.RaceUpdateToOneWithWhereWithoutAnimalInput> = z.object({
  where: z.lazy(() => RaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RaceUpdateWithoutAnimalInputSchema),z.lazy(() => RaceUncheckedUpdateWithoutAnimalInputSchema) ]),
}).strict();

export const RaceUpdateWithoutAnimalInputSchema: z.ZodType<Prisma.RaceUpdateWithoutAnimalInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RaceUncheckedUpdateWithoutAnimalInputSchema: z.ZodType<Prisma.RaceUncheckedUpdateWithoutAnimalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HabitatUpsertWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatUpsertWithoutAnimauxInput> = z.object({
  update: z.union([ z.lazy(() => HabitatUpdateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedUpdateWithoutAnimauxInputSchema) ]),
  create: z.union([ z.lazy(() => HabitatCreateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAnimauxInputSchema) ]),
  where: z.lazy(() => HabitatWhereInputSchema).optional()
}).strict();

export const HabitatUpdateToOneWithWhereWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatUpdateToOneWithWhereWithoutAnimauxInput> = z.object({
  where: z.lazy(() => HabitatWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HabitatUpdateWithoutAnimauxInputSchema),z.lazy(() => HabitatUncheckedUpdateWithoutAnimauxInputSchema) ]),
}).strict();

export const HabitatUpdateWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatUpdateWithoutAnimauxInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
  avis: z.lazy(() => AvisUpdateManyWithoutHabitatNestedInputSchema).optional()
}).strict();

export const HabitatUncheckedUpdateWithoutAnimauxInputSchema: z.ZodType<Prisma.HabitatUncheckedUpdateWithoutAnimauxInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
  avis: z.lazy(() => AvisUncheckedUpdateManyWithoutHabitatNestedInputSchema).optional()
}).strict();

export const RapportUpsertWithWhereUniqueWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUpsertWithWhereUniqueWithoutAnimalInput> = z.object({
  where: z.lazy(() => RapportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RapportUpdateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedUpdateWithoutAnimalInputSchema) ]),
  create: z.union([ z.lazy(() => RapportCreateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedCreateWithoutAnimalInputSchema) ]),
}).strict();

export const RapportUpdateWithWhereUniqueWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUpdateWithWhereUniqueWithoutAnimalInput> = z.object({
  where: z.lazy(() => RapportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RapportUpdateWithoutAnimalInputSchema),z.lazy(() => RapportUncheckedUpdateWithoutAnimalInputSchema) ]),
}).strict();

export const RapportUpdateManyWithWhereWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUpdateManyWithWhereWithoutAnimalInput> = z.object({
  where: z.lazy(() => RapportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RapportUpdateManyMutationInputSchema),z.lazy(() => RapportUncheckedUpdateManyWithoutAnimalInputSchema) ]),
}).strict();

export const NourritureUpsertWithWhereUniqueWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUpsertWithWhereUniqueWithoutAnimalInput> = z.object({
  where: z.lazy(() => NourritureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NourritureUpdateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedUpdateWithoutAnimalInputSchema) ]),
  create: z.union([ z.lazy(() => NourritureCreateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedCreateWithoutAnimalInputSchema) ]),
}).strict();

export const NourritureUpdateWithWhereUniqueWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUpdateWithWhereUniqueWithoutAnimalInput> = z.object({
  where: z.lazy(() => NourritureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NourritureUpdateWithoutAnimalInputSchema),z.lazy(() => NourritureUncheckedUpdateWithoutAnimalInputSchema) ]),
}).strict();

export const NourritureUpdateManyWithWhereWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUpdateManyWithWhereWithoutAnimalInput> = z.object({
  where: z.lazy(() => NourritureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NourritureUpdateManyMutationInputSchema),z.lazy(() => NourritureUncheckedUpdateManyWithoutAnimalInputSchema) ]),
}).strict();

export const AnimalCreateWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalCreateWithoutRapportsInput> = z.object({
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceCreateNestedOneWithoutAnimalInputSchema),
  habitat: z.lazy(() => HabitatCreateNestedOneWithoutAnimauxInputSchema),
  nourritures: z.lazy(() => NourritureCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalUncheckedCreateWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateWithoutRapportsInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.number().int(),
  nourritures: z.lazy(() => NourritureUncheckedCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalCreateOrConnectWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalCreateOrConnectWithoutRapportsInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnimalCreateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRapportsInputSchema) ]),
}).strict();

export const UtilisateurCreateWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurCreateWithoutRapportInput> = z.object({
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema),
  Nouriture: z.lazy(() => NourritureCreateNestedManyWithoutEmployeInputSchema).optional()
}).strict();

export const UtilisateurUncheckedCreateWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurUncheckedCreateWithoutRapportInput> = z.object({
  id: z.number().int().optional(),
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema),
  Nouriture: z.lazy(() => NourritureUncheckedCreateNestedManyWithoutEmployeInputSchema).optional()
}).strict();

export const UtilisateurCreateOrConnectWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurCreateOrConnectWithoutRapportInput> = z.object({
  where: z.lazy(() => UtilisateurWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutRapportInputSchema) ]),
}).strict();

export const AnimalUpsertWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalUpsertWithoutRapportsInput> = z.object({
  update: z.union([ z.lazy(() => AnimalUpdateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutRapportsInputSchema) ]),
  create: z.union([ z.lazy(() => AnimalCreateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutRapportsInputSchema) ]),
  where: z.lazy(() => AnimalWhereInputSchema).optional()
}).strict();

export const AnimalUpdateToOneWithWhereWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalUpdateToOneWithWhereWithoutRapportsInput> = z.object({
  where: z.lazy(() => AnimalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnimalUpdateWithoutRapportsInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutRapportsInputSchema) ]),
}).strict();

export const AnimalUpdateWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalUpdateWithoutRapportsInput> = z.object({
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceUpdateOneRequiredWithoutAnimalNestedInputSchema).optional(),
  habitat: z.lazy(() => HabitatUpdateOneRequiredWithoutAnimauxNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateWithoutRapportsInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateWithoutRapportsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nourritures: z.lazy(() => NourritureUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const UtilisateurUpsertWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurUpsertWithoutRapportInput> = z.object({
  update: z.union([ z.lazy(() => UtilisateurUpdateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedUpdateWithoutRapportInputSchema) ]),
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutRapportInputSchema) ]),
  where: z.lazy(() => UtilisateurWhereInputSchema).optional()
}).strict();

export const UtilisateurUpdateToOneWithWhereWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurUpdateToOneWithWhereWithoutRapportInput> = z.object({
  where: z.lazy(() => UtilisateurWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UtilisateurUpdateWithoutRapportInputSchema),z.lazy(() => UtilisateurUncheckedUpdateWithoutRapportInputSchema) ]),
}).strict();

export const UtilisateurUpdateWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurUpdateWithoutRapportInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  Nouriture: z.lazy(() => NourritureUpdateManyWithoutEmployeNestedInputSchema).optional()
}).strict();

export const UtilisateurUncheckedUpdateWithoutRapportInputSchema: z.ZodType<Prisma.UtilisateurUncheckedUpdateWithoutRapportInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  Nouriture: z.lazy(() => NourritureUncheckedUpdateManyWithoutEmployeNestedInputSchema).optional()
}).strict();

export const UtilisateurCreateWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurCreateWithoutNouritureInput> = z.object({
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema),
  Rapport: z.lazy(() => RapportCreateNestedManyWithoutVeterinaireInputSchema).optional()
}).strict();

export const UtilisateurUncheckedCreateWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurUncheckedCreateWithoutNouritureInput> = z.object({
  id: z.number().int().optional(),
  uid: z.string(),
  nom: z.string(),
  prenom: z.string(),
  role: z.lazy(() => RoleEnumSchema),
  Rapport: z.lazy(() => RapportUncheckedCreateNestedManyWithoutVeterinaireInputSchema).optional()
}).strict();

export const UtilisateurCreateOrConnectWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurCreateOrConnectWithoutNouritureInput> = z.object({
  where: z.lazy(() => UtilisateurWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutNouritureInputSchema) ]),
}).strict();

export const AnimalCreateWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalCreateWithoutNourrituresInput> = z.object({
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceCreateNestedOneWithoutAnimalInputSchema),
  habitat: z.lazy(() => HabitatCreateNestedOneWithoutAnimauxInputSchema),
  rapports: z.lazy(() => RapportCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalUncheckedCreateWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalUncheckedCreateWithoutNourrituresInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.number().int(),
  rapports: z.lazy(() => RapportUncheckedCreateNestedManyWithoutAnimalInputSchema).optional()
}).strict();

export const AnimalCreateOrConnectWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalCreateOrConnectWithoutNourrituresInput> = z.object({
  where: z.lazy(() => AnimalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnimalCreateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutNourrituresInputSchema) ]),
}).strict();

export const UtilisateurUpsertWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurUpsertWithoutNouritureInput> = z.object({
  update: z.union([ z.lazy(() => UtilisateurUpdateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedUpdateWithoutNouritureInputSchema) ]),
  create: z.union([ z.lazy(() => UtilisateurCreateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedCreateWithoutNouritureInputSchema) ]),
  where: z.lazy(() => UtilisateurWhereInputSchema).optional()
}).strict();

export const UtilisateurUpdateToOneWithWhereWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurUpdateToOneWithWhereWithoutNouritureInput> = z.object({
  where: z.lazy(() => UtilisateurWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UtilisateurUpdateWithoutNouritureInputSchema),z.lazy(() => UtilisateurUncheckedUpdateWithoutNouritureInputSchema) ]),
}).strict();

export const UtilisateurUpdateWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurUpdateWithoutNouritureInput> = z.object({
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  Rapport: z.lazy(() => RapportUpdateManyWithoutVeterinaireNestedInputSchema).optional()
}).strict();

export const UtilisateurUncheckedUpdateWithoutNouritureInputSchema: z.ZodType<Prisma.UtilisateurUncheckedUpdateWithoutNouritureInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleEnumSchema),z.lazy(() => EnumRoleEnumFieldUpdateOperationsInputSchema) ]).optional(),
  Rapport: z.lazy(() => RapportUncheckedUpdateManyWithoutVeterinaireNestedInputSchema).optional()
}).strict();

export const AnimalUpsertWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalUpsertWithoutNourrituresInput> = z.object({
  update: z.union([ z.lazy(() => AnimalUpdateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutNourrituresInputSchema) ]),
  create: z.union([ z.lazy(() => AnimalCreateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedCreateWithoutNourrituresInputSchema) ]),
  where: z.lazy(() => AnimalWhereInputSchema).optional()
}).strict();

export const AnimalUpdateToOneWithWhereWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalUpdateToOneWithWhereWithoutNourrituresInput> = z.object({
  where: z.lazy(() => AnimalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AnimalUpdateWithoutNourrituresInputSchema),z.lazy(() => AnimalUncheckedUpdateWithoutNourrituresInputSchema) ]),
}).strict();

export const AnimalUpdateWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalUpdateWithoutNourrituresInput> = z.object({
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceUpdateOneRequiredWithoutAnimalNestedInputSchema).optional(),
  habitat: z.lazy(() => HabitatUpdateOneRequiredWithoutAnimauxNestedInputSchema).optional(),
  rapports: z.lazy(() => RapportUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateWithoutNourrituresInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateWithoutNourrituresInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rapports: z.lazy(() => RapportUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const HabitatCreateWithoutAvisInputSchema: z.ZodType<Prisma.HabitatCreateWithoutAvisInput> = z.object({
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalCreateNestedManyWithoutHabitatInputSchema).optional()
}).strict();

export const HabitatUncheckedCreateWithoutAvisInputSchema: z.ZodType<Prisma.HabitatUncheckedCreateWithoutAvisInput> = z.object({
  id: z.number().int().optional(),
  nom: z.string(),
  description: z.string(),
  images: z.union([ z.lazy(() => HabitatCreateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalUncheckedCreateNestedManyWithoutHabitatInputSchema).optional()
}).strict();

export const HabitatCreateOrConnectWithoutAvisInputSchema: z.ZodType<Prisma.HabitatCreateOrConnectWithoutAvisInput> = z.object({
  where: z.lazy(() => HabitatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HabitatCreateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAvisInputSchema) ]),
}).strict();

export const HabitatUpsertWithoutAvisInputSchema: z.ZodType<Prisma.HabitatUpsertWithoutAvisInput> = z.object({
  update: z.union([ z.lazy(() => HabitatUpdateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedUpdateWithoutAvisInputSchema) ]),
  create: z.union([ z.lazy(() => HabitatCreateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedCreateWithoutAvisInputSchema) ]),
  where: z.lazy(() => HabitatWhereInputSchema).optional()
}).strict();

export const HabitatUpdateToOneWithWhereWithoutAvisInputSchema: z.ZodType<Prisma.HabitatUpdateToOneWithWhereWithoutAvisInput> = z.object({
  where: z.lazy(() => HabitatWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HabitatUpdateWithoutAvisInputSchema),z.lazy(() => HabitatUncheckedUpdateWithoutAvisInputSchema) ]),
}).strict();

export const HabitatUpdateWithoutAvisInputSchema: z.ZodType<Prisma.HabitatUpdateWithoutAvisInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalUpdateManyWithoutHabitatNestedInputSchema).optional()
}).strict();

export const HabitatUncheckedUpdateWithoutAvisInputSchema: z.ZodType<Prisma.HabitatUncheckedUpdateWithoutAvisInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => HabitatUpdateimagesInputSchema),z.string().array() ]).optional(),
  animaux: z.lazy(() => AnimalUncheckedUpdateManyWithoutHabitatNestedInputSchema).optional()
}).strict();

export const RapportCreateManyVeterinaireInputSchema: z.ZodType<Prisma.RapportCreateManyVeterinaireInput> = z.object({
  id: z.number().int().optional(),
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  animalId: z.number().int()
}).strict();

export const NourritureCreateManyEmployeInputSchema: z.ZodType<Prisma.NourritureCreateManyEmployeInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  animalId: z.number().int()
}).strict();

export const RapportUpdateWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUpdateWithoutVeterinaireInput> = z.object({
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  animal: z.lazy(() => AnimalUpdateOneRequiredWithoutRapportsNestedInputSchema).optional()
}).strict();

export const RapportUncheckedUpdateWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateWithoutVeterinaireInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RapportUncheckedUpdateManyWithoutVeterinaireInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateManyWithoutVeterinaireInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureUpdateWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUpdateWithoutEmployeInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  animal: z.lazy(() => AnimalUpdateOneRequiredWithoutNourrituresNestedInputSchema).optional()
}).strict();

export const NourritureUncheckedUpdateWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateWithoutEmployeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureUncheckedUpdateManyWithoutEmployeInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateManyWithoutEmployeInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  animalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnimalCreateManyHabitatInputSchema: z.ZodType<Prisma.AnimalCreateManyHabitatInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  raceId: z.number().int(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const AvisCreateManyHabitatInputSchema: z.ZodType<Prisma.AvisCreateManyHabitatInput> = z.object({
  id: z.number().int().optional(),
  pseudo: z.string(),
  commentaire: z.string(),
  isVisible: z.boolean()
}).strict();

export const AnimalUpdateWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUpdateWithoutHabitatInput> = z.object({
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  race: z.lazy(() => RaceUpdateOneRequiredWithoutAnimalNestedInputSchema).optional(),
  rapports: z.lazy(() => RapportUpdateManyWithoutAnimalNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateWithoutHabitatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  rapports: z.lazy(() => RapportUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateManyWithoutHabitatInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateManyWithoutHabitatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  raceId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
}).strict();

export const AvisUpdateWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUpdateWithoutHabitatInput> = z.object({
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AvisUncheckedUpdateWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUncheckedUpdateWithoutHabitatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AvisUncheckedUpdateManyWithoutHabitatInputSchema: z.ZodType<Prisma.AvisUncheckedUpdateManyWithoutHabitatInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pseudo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isVisible: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnimalCreateManyRaceInputSchema: z.ZodType<Prisma.AnimalCreateManyRaceInput> = z.object({
  id: z.number().int().optional(),
  prenom: z.string(),
  images: z.union([ z.lazy(() => AnimalCreateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.number().int()
}).strict();

export const AnimalUpdateWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUpdateWithoutRaceInput> = z.object({
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitat: z.lazy(() => HabitatUpdateOneRequiredWithoutAnimauxNestedInputSchema).optional(),
  rapports: z.lazy(() => RapportUpdateManyWithoutAnimalNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateWithoutRaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rapports: z.lazy(() => RapportUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional(),
  nourritures: z.lazy(() => NourritureUncheckedUpdateManyWithoutAnimalNestedInputSchema).optional()
}).strict();

export const AnimalUncheckedUpdateManyWithoutRaceInputSchema: z.ZodType<Prisma.AnimalUncheckedUpdateManyWithoutRaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prenom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => AnimalUpdateimagesInputSchema),z.string().array() ]).optional(),
  habitatId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RapportCreateManyAnimalInputSchema: z.ZodType<Prisma.RapportCreateManyAnimalInput> = z.object({
  id: z.number().int().optional(),
  etat: z.lazy(() => EtatAnimalSchema),
  date: z.coerce.date(),
  detail: z.string().optional().nullable(),
  veterinaireId: z.number().int()
}).strict();

export const NourritureCreateManyAnimalInputSchema: z.ZodType<Prisma.NourritureCreateManyAnimalInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  grammage: z.number().int(),
  date: z.coerce.date(),
  employeId: z.number().int()
}).strict();

export const RapportUpdateWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUpdateWithoutAnimalInput> = z.object({
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  veterinaire: z.lazy(() => UtilisateurUpdateOneRequiredWithoutRapportNestedInputSchema).optional()
}).strict();

export const RapportUncheckedUpdateWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateWithoutAnimalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  veterinaireId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RapportUncheckedUpdateManyWithoutAnimalInputSchema: z.ZodType<Prisma.RapportUncheckedUpdateManyWithoutAnimalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  etat: z.union([ z.lazy(() => EtatAnimalSchema),z.lazy(() => EnumEtatAnimalFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  veterinaireId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureUpdateWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUpdateWithoutAnimalInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  employe: z.lazy(() => UtilisateurUpdateOneRequiredWithoutNouritureNestedInputSchema).optional()
}).strict();

export const NourritureUncheckedUpdateWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateWithoutAnimalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  employeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NourritureUncheckedUpdateManyWithoutAnimalInputSchema: z.ZodType<Prisma.NourritureUncheckedUpdateManyWithoutAnimalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  grammage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  employeId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UtilisateurFindFirstArgsSchema: z.ZodType<Prisma.UtilisateurFindFirstArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereInputSchema.optional(),
  orderBy: z.union([ UtilisateurOrderByWithRelationInputSchema.array(),UtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: UtilisateurWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UtilisateurScalarFieldEnumSchema,UtilisateurScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UtilisateurFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UtilisateurFindFirstOrThrowArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereInputSchema.optional(),
  orderBy: z.union([ UtilisateurOrderByWithRelationInputSchema.array(),UtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: UtilisateurWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UtilisateurScalarFieldEnumSchema,UtilisateurScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UtilisateurFindManyArgsSchema: z.ZodType<Prisma.UtilisateurFindManyArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereInputSchema.optional(),
  orderBy: z.union([ UtilisateurOrderByWithRelationInputSchema.array(),UtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: UtilisateurWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UtilisateurScalarFieldEnumSchema,UtilisateurScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UtilisateurAggregateArgsSchema: z.ZodType<Prisma.UtilisateurAggregateArgs> = z.object({
  where: UtilisateurWhereInputSchema.optional(),
  orderBy: z.union([ UtilisateurOrderByWithRelationInputSchema.array(),UtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: UtilisateurWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UtilisateurGroupByArgsSchema: z.ZodType<Prisma.UtilisateurGroupByArgs> = z.object({
  where: UtilisateurWhereInputSchema.optional(),
  orderBy: z.union([ UtilisateurOrderByWithAggregationInputSchema.array(),UtilisateurOrderByWithAggregationInputSchema ]).optional(),
  by: UtilisateurScalarFieldEnumSchema.array(),
  having: UtilisateurScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UtilisateurFindUniqueArgsSchema: z.ZodType<Prisma.UtilisateurFindUniqueArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereUniqueInputSchema,
}).strict() ;

export const UtilisateurFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UtilisateurFindUniqueOrThrowArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const HabitatFindFirstArgsSchema: z.ZodType<Prisma.HabitatFindFirstArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereInputSchema.optional(),
  orderBy: z.union([ HabitatOrderByWithRelationInputSchema.array(),HabitatOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HabitatScalarFieldEnumSchema,HabitatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HabitatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HabitatFindFirstOrThrowArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereInputSchema.optional(),
  orderBy: z.union([ HabitatOrderByWithRelationInputSchema.array(),HabitatOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HabitatScalarFieldEnumSchema,HabitatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HabitatFindManyArgsSchema: z.ZodType<Prisma.HabitatFindManyArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereInputSchema.optional(),
  orderBy: z.union([ HabitatOrderByWithRelationInputSchema.array(),HabitatOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HabitatScalarFieldEnumSchema,HabitatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HabitatAggregateArgsSchema: z.ZodType<Prisma.HabitatAggregateArgs> = z.object({
  where: HabitatWhereInputSchema.optional(),
  orderBy: z.union([ HabitatOrderByWithRelationInputSchema.array(),HabitatOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HabitatGroupByArgsSchema: z.ZodType<Prisma.HabitatGroupByArgs> = z.object({
  where: HabitatWhereInputSchema.optional(),
  orderBy: z.union([ HabitatOrderByWithAggregationInputSchema.array(),HabitatOrderByWithAggregationInputSchema ]).optional(),
  by: HabitatScalarFieldEnumSchema.array(),
  having: HabitatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HabitatFindUniqueArgsSchema: z.ZodType<Prisma.HabitatFindUniqueArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereUniqueInputSchema,
}).strict() ;

export const HabitatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HabitatFindUniqueOrThrowArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereUniqueInputSchema,
}).strict() ;

export const RaceFindFirstArgsSchema: z.ZodType<Prisma.RaceFindFirstArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RaceScalarFieldEnumSchema,RaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RaceFindFirstOrThrowArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RaceScalarFieldEnumSchema,RaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RaceFindManyArgsSchema: z.ZodType<Prisma.RaceFindManyArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RaceScalarFieldEnumSchema,RaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RaceAggregateArgsSchema: z.ZodType<Prisma.RaceAggregateArgs> = z.object({
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithRelationInputSchema.array(),RaceOrderByWithRelationInputSchema ]).optional(),
  cursor: RaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RaceGroupByArgsSchema: z.ZodType<Prisma.RaceGroupByArgs> = z.object({
  where: RaceWhereInputSchema.optional(),
  orderBy: z.union([ RaceOrderByWithAggregationInputSchema.array(),RaceOrderByWithAggregationInputSchema ]).optional(),
  by: RaceScalarFieldEnumSchema.array(),
  having: RaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RaceFindUniqueArgsSchema: z.ZodType<Prisma.RaceFindUniqueArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const RaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RaceFindUniqueOrThrowArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const AnimalFindFirstArgsSchema: z.ZodType<Prisma.AnimalFindFirstArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereInputSchema.optional(),
  orderBy: z.union([ AnimalOrderByWithRelationInputSchema.array(),AnimalOrderByWithRelationInputSchema ]).optional(),
  cursor: AnimalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnimalScalarFieldEnumSchema,AnimalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnimalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnimalFindFirstOrThrowArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereInputSchema.optional(),
  orderBy: z.union([ AnimalOrderByWithRelationInputSchema.array(),AnimalOrderByWithRelationInputSchema ]).optional(),
  cursor: AnimalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnimalScalarFieldEnumSchema,AnimalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnimalFindManyArgsSchema: z.ZodType<Prisma.AnimalFindManyArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereInputSchema.optional(),
  orderBy: z.union([ AnimalOrderByWithRelationInputSchema.array(),AnimalOrderByWithRelationInputSchema ]).optional(),
  cursor: AnimalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnimalScalarFieldEnumSchema,AnimalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AnimalAggregateArgsSchema: z.ZodType<Prisma.AnimalAggregateArgs> = z.object({
  where: AnimalWhereInputSchema.optional(),
  orderBy: z.union([ AnimalOrderByWithRelationInputSchema.array(),AnimalOrderByWithRelationInputSchema ]).optional(),
  cursor: AnimalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnimalGroupByArgsSchema: z.ZodType<Prisma.AnimalGroupByArgs> = z.object({
  where: AnimalWhereInputSchema.optional(),
  orderBy: z.union([ AnimalOrderByWithAggregationInputSchema.array(),AnimalOrderByWithAggregationInputSchema ]).optional(),
  by: AnimalScalarFieldEnumSchema.array(),
  having: AnimalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AnimalFindUniqueArgsSchema: z.ZodType<Prisma.AnimalFindUniqueArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereUniqueInputSchema,
}).strict() ;

export const AnimalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnimalFindUniqueOrThrowArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereUniqueInputSchema,
}).strict() ;

export const RapportFindFirstArgsSchema: z.ZodType<Prisma.RapportFindFirstArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereInputSchema.optional(),
  orderBy: z.union([ RapportOrderByWithRelationInputSchema.array(),RapportOrderByWithRelationInputSchema ]).optional(),
  cursor: RapportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RapportScalarFieldEnumSchema,RapportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RapportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RapportFindFirstOrThrowArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereInputSchema.optional(),
  orderBy: z.union([ RapportOrderByWithRelationInputSchema.array(),RapportOrderByWithRelationInputSchema ]).optional(),
  cursor: RapportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RapportScalarFieldEnumSchema,RapportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RapportFindManyArgsSchema: z.ZodType<Prisma.RapportFindManyArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereInputSchema.optional(),
  orderBy: z.union([ RapportOrderByWithRelationInputSchema.array(),RapportOrderByWithRelationInputSchema ]).optional(),
  cursor: RapportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RapportScalarFieldEnumSchema,RapportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RapportAggregateArgsSchema: z.ZodType<Prisma.RapportAggregateArgs> = z.object({
  where: RapportWhereInputSchema.optional(),
  orderBy: z.union([ RapportOrderByWithRelationInputSchema.array(),RapportOrderByWithRelationInputSchema ]).optional(),
  cursor: RapportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RapportGroupByArgsSchema: z.ZodType<Prisma.RapportGroupByArgs> = z.object({
  where: RapportWhereInputSchema.optional(),
  orderBy: z.union([ RapportOrderByWithAggregationInputSchema.array(),RapportOrderByWithAggregationInputSchema ]).optional(),
  by: RapportScalarFieldEnumSchema.array(),
  having: RapportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RapportFindUniqueArgsSchema: z.ZodType<Prisma.RapportFindUniqueArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereUniqueInputSchema,
}).strict() ;

export const RapportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RapportFindUniqueOrThrowArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereUniqueInputSchema,
}).strict() ;

export const NourritureFindFirstArgsSchema: z.ZodType<Prisma.NourritureFindFirstArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereInputSchema.optional(),
  orderBy: z.union([ NourritureOrderByWithRelationInputSchema.array(),NourritureOrderByWithRelationInputSchema ]).optional(),
  cursor: NourritureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NourritureScalarFieldEnumSchema,NourritureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NourritureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NourritureFindFirstOrThrowArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereInputSchema.optional(),
  orderBy: z.union([ NourritureOrderByWithRelationInputSchema.array(),NourritureOrderByWithRelationInputSchema ]).optional(),
  cursor: NourritureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NourritureScalarFieldEnumSchema,NourritureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NourritureFindManyArgsSchema: z.ZodType<Prisma.NourritureFindManyArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereInputSchema.optional(),
  orderBy: z.union([ NourritureOrderByWithRelationInputSchema.array(),NourritureOrderByWithRelationInputSchema ]).optional(),
  cursor: NourritureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NourritureScalarFieldEnumSchema,NourritureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NourritureAggregateArgsSchema: z.ZodType<Prisma.NourritureAggregateArgs> = z.object({
  where: NourritureWhereInputSchema.optional(),
  orderBy: z.union([ NourritureOrderByWithRelationInputSchema.array(),NourritureOrderByWithRelationInputSchema ]).optional(),
  cursor: NourritureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NourritureGroupByArgsSchema: z.ZodType<Prisma.NourritureGroupByArgs> = z.object({
  where: NourritureWhereInputSchema.optional(),
  orderBy: z.union([ NourritureOrderByWithAggregationInputSchema.array(),NourritureOrderByWithAggregationInputSchema ]).optional(),
  by: NourritureScalarFieldEnumSchema.array(),
  having: NourritureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NourritureFindUniqueArgsSchema: z.ZodType<Prisma.NourritureFindUniqueArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereUniqueInputSchema,
}).strict() ;

export const NourritureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NourritureFindUniqueOrThrowArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereUniqueInputSchema,
}).strict() ;

export const AvisFindFirstArgsSchema: z.ZodType<Prisma.AvisFindFirstArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereInputSchema.optional(),
  orderBy: z.union([ AvisOrderByWithRelationInputSchema.array(),AvisOrderByWithRelationInputSchema ]).optional(),
  cursor: AvisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AvisScalarFieldEnumSchema,AvisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AvisFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AvisFindFirstOrThrowArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereInputSchema.optional(),
  orderBy: z.union([ AvisOrderByWithRelationInputSchema.array(),AvisOrderByWithRelationInputSchema ]).optional(),
  cursor: AvisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AvisScalarFieldEnumSchema,AvisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AvisFindManyArgsSchema: z.ZodType<Prisma.AvisFindManyArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereInputSchema.optional(),
  orderBy: z.union([ AvisOrderByWithRelationInputSchema.array(),AvisOrderByWithRelationInputSchema ]).optional(),
  cursor: AvisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AvisScalarFieldEnumSchema,AvisScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AvisAggregateArgsSchema: z.ZodType<Prisma.AvisAggregateArgs> = z.object({
  where: AvisWhereInputSchema.optional(),
  orderBy: z.union([ AvisOrderByWithRelationInputSchema.array(),AvisOrderByWithRelationInputSchema ]).optional(),
  cursor: AvisWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AvisGroupByArgsSchema: z.ZodType<Prisma.AvisGroupByArgs> = z.object({
  where: AvisWhereInputSchema.optional(),
  orderBy: z.union([ AvisOrderByWithAggregationInputSchema.array(),AvisOrderByWithAggregationInputSchema ]).optional(),
  by: AvisScalarFieldEnumSchema.array(),
  having: AvisScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AvisFindUniqueArgsSchema: z.ZodType<Prisma.AvisFindUniqueArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereUniqueInputSchema,
}).strict() ;

export const AvisFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AvisFindUniqueOrThrowArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereUniqueInputSchema,
}).strict() ;

export const UtilisateurCreateArgsSchema: z.ZodType<Prisma.UtilisateurCreateArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  data: z.union([ UtilisateurCreateInputSchema,UtilisateurUncheckedCreateInputSchema ]),
}).strict() ;

export const UtilisateurUpsertArgsSchema: z.ZodType<Prisma.UtilisateurUpsertArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereUniqueInputSchema,
  create: z.union([ UtilisateurCreateInputSchema,UtilisateurUncheckedCreateInputSchema ]),
  update: z.union([ UtilisateurUpdateInputSchema,UtilisateurUncheckedUpdateInputSchema ]),
}).strict() ;

export const UtilisateurCreateManyArgsSchema: z.ZodType<Prisma.UtilisateurCreateManyArgs> = z.object({
  data: z.union([ UtilisateurCreateManyInputSchema,UtilisateurCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UtilisateurCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UtilisateurCreateManyAndReturnArgs> = z.object({
  data: z.union([ UtilisateurCreateManyInputSchema,UtilisateurCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UtilisateurDeleteArgsSchema: z.ZodType<Prisma.UtilisateurDeleteArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  where: UtilisateurWhereUniqueInputSchema,
}).strict() ;

export const UtilisateurUpdateArgsSchema: z.ZodType<Prisma.UtilisateurUpdateArgs> = z.object({
  select: UtilisateurSelectSchema.optional(),
  include: UtilisateurIncludeSchema.optional(),
  data: z.union([ UtilisateurUpdateInputSchema,UtilisateurUncheckedUpdateInputSchema ]),
  where: UtilisateurWhereUniqueInputSchema,
}).strict() ;

export const UtilisateurUpdateManyArgsSchema: z.ZodType<Prisma.UtilisateurUpdateManyArgs> = z.object({
  data: z.union([ UtilisateurUpdateManyMutationInputSchema,UtilisateurUncheckedUpdateManyInputSchema ]),
  where: UtilisateurWhereInputSchema.optional(),
}).strict() ;

export const UtilisateurDeleteManyArgsSchema: z.ZodType<Prisma.UtilisateurDeleteManyArgs> = z.object({
  where: UtilisateurWhereInputSchema.optional(),
}).strict() ;

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const HabitatCreateArgsSchema: z.ZodType<Prisma.HabitatCreateArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  data: z.union([ HabitatCreateInputSchema,HabitatUncheckedCreateInputSchema ]),
}).strict() ;

export const HabitatUpsertArgsSchema: z.ZodType<Prisma.HabitatUpsertArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereUniqueInputSchema,
  create: z.union([ HabitatCreateInputSchema,HabitatUncheckedCreateInputSchema ]),
  update: z.union([ HabitatUpdateInputSchema,HabitatUncheckedUpdateInputSchema ]),
}).strict() ;

export const HabitatCreateManyArgsSchema: z.ZodType<Prisma.HabitatCreateManyArgs> = z.object({
  data: z.union([ HabitatCreateManyInputSchema,HabitatCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HabitatCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HabitatCreateManyAndReturnArgs> = z.object({
  data: z.union([ HabitatCreateManyInputSchema,HabitatCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HabitatDeleteArgsSchema: z.ZodType<Prisma.HabitatDeleteArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  where: HabitatWhereUniqueInputSchema,
}).strict() ;

export const HabitatUpdateArgsSchema: z.ZodType<Prisma.HabitatUpdateArgs> = z.object({
  select: HabitatSelectSchema.optional(),
  include: HabitatIncludeSchema.optional(),
  data: z.union([ HabitatUpdateInputSchema,HabitatUncheckedUpdateInputSchema ]),
  where: HabitatWhereUniqueInputSchema,
}).strict() ;

export const HabitatUpdateManyArgsSchema: z.ZodType<Prisma.HabitatUpdateManyArgs> = z.object({
  data: z.union([ HabitatUpdateManyMutationInputSchema,HabitatUncheckedUpdateManyInputSchema ]),
  where: HabitatWhereInputSchema.optional(),
}).strict() ;

export const HabitatDeleteManyArgsSchema: z.ZodType<Prisma.HabitatDeleteManyArgs> = z.object({
  where: HabitatWhereInputSchema.optional(),
}).strict() ;

export const RaceCreateArgsSchema: z.ZodType<Prisma.RaceCreateArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  data: z.union([ RaceCreateInputSchema,RaceUncheckedCreateInputSchema ]),
}).strict() ;

export const RaceUpsertArgsSchema: z.ZodType<Prisma.RaceUpsertArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
  create: z.union([ RaceCreateInputSchema,RaceUncheckedCreateInputSchema ]),
  update: z.union([ RaceUpdateInputSchema,RaceUncheckedUpdateInputSchema ]),
}).strict() ;

export const RaceCreateManyArgsSchema: z.ZodType<Prisma.RaceCreateManyArgs> = z.object({
  data: z.union([ RaceCreateManyInputSchema,RaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RaceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RaceCreateManyAndReturnArgs> = z.object({
  data: z.union([ RaceCreateManyInputSchema,RaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RaceDeleteArgsSchema: z.ZodType<Prisma.RaceDeleteArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const RaceUpdateArgsSchema: z.ZodType<Prisma.RaceUpdateArgs> = z.object({
  select: RaceSelectSchema.optional(),
  include: RaceIncludeSchema.optional(),
  data: z.union([ RaceUpdateInputSchema,RaceUncheckedUpdateInputSchema ]),
  where: RaceWhereUniqueInputSchema,
}).strict() ;

export const RaceUpdateManyArgsSchema: z.ZodType<Prisma.RaceUpdateManyArgs> = z.object({
  data: z.union([ RaceUpdateManyMutationInputSchema,RaceUncheckedUpdateManyInputSchema ]),
  where: RaceWhereInputSchema.optional(),
}).strict() ;

export const RaceDeleteManyArgsSchema: z.ZodType<Prisma.RaceDeleteManyArgs> = z.object({
  where: RaceWhereInputSchema.optional(),
}).strict() ;

export const AnimalCreateArgsSchema: z.ZodType<Prisma.AnimalCreateArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  data: z.union([ AnimalCreateInputSchema,AnimalUncheckedCreateInputSchema ]),
}).strict() ;

export const AnimalUpsertArgsSchema: z.ZodType<Prisma.AnimalUpsertArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereUniqueInputSchema,
  create: z.union([ AnimalCreateInputSchema,AnimalUncheckedCreateInputSchema ]),
  update: z.union([ AnimalUpdateInputSchema,AnimalUncheckedUpdateInputSchema ]),
}).strict() ;

export const AnimalCreateManyArgsSchema: z.ZodType<Prisma.AnimalCreateManyArgs> = z.object({
  data: z.union([ AnimalCreateManyInputSchema,AnimalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnimalCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AnimalCreateManyAndReturnArgs> = z.object({
  data: z.union([ AnimalCreateManyInputSchema,AnimalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AnimalDeleteArgsSchema: z.ZodType<Prisma.AnimalDeleteArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  where: AnimalWhereUniqueInputSchema,
}).strict() ;

export const AnimalUpdateArgsSchema: z.ZodType<Prisma.AnimalUpdateArgs> = z.object({
  select: AnimalSelectSchema.optional(),
  include: AnimalIncludeSchema.optional(),
  data: z.union([ AnimalUpdateInputSchema,AnimalUncheckedUpdateInputSchema ]),
  where: AnimalWhereUniqueInputSchema,
}).strict() ;

export const AnimalUpdateManyArgsSchema: z.ZodType<Prisma.AnimalUpdateManyArgs> = z.object({
  data: z.union([ AnimalUpdateManyMutationInputSchema,AnimalUncheckedUpdateManyInputSchema ]),
  where: AnimalWhereInputSchema.optional(),
}).strict() ;

export const AnimalDeleteManyArgsSchema: z.ZodType<Prisma.AnimalDeleteManyArgs> = z.object({
  where: AnimalWhereInputSchema.optional(),
}).strict() ;

export const RapportCreateArgsSchema: z.ZodType<Prisma.RapportCreateArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  data: z.union([ RapportCreateInputSchema,RapportUncheckedCreateInputSchema ]),
}).strict() ;

export const RapportUpsertArgsSchema: z.ZodType<Prisma.RapportUpsertArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereUniqueInputSchema,
  create: z.union([ RapportCreateInputSchema,RapportUncheckedCreateInputSchema ]),
  update: z.union([ RapportUpdateInputSchema,RapportUncheckedUpdateInputSchema ]),
}).strict() ;

export const RapportCreateManyArgsSchema: z.ZodType<Prisma.RapportCreateManyArgs> = z.object({
  data: z.union([ RapportCreateManyInputSchema,RapportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RapportCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RapportCreateManyAndReturnArgs> = z.object({
  data: z.union([ RapportCreateManyInputSchema,RapportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RapportDeleteArgsSchema: z.ZodType<Prisma.RapportDeleteArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  where: RapportWhereUniqueInputSchema,
}).strict() ;

export const RapportUpdateArgsSchema: z.ZodType<Prisma.RapportUpdateArgs> = z.object({
  select: RapportSelectSchema.optional(),
  include: RapportIncludeSchema.optional(),
  data: z.union([ RapportUpdateInputSchema,RapportUncheckedUpdateInputSchema ]),
  where: RapportWhereUniqueInputSchema,
}).strict() ;

export const RapportUpdateManyArgsSchema: z.ZodType<Prisma.RapportUpdateManyArgs> = z.object({
  data: z.union([ RapportUpdateManyMutationInputSchema,RapportUncheckedUpdateManyInputSchema ]),
  where: RapportWhereInputSchema.optional(),
}).strict() ;

export const RapportDeleteManyArgsSchema: z.ZodType<Prisma.RapportDeleteManyArgs> = z.object({
  where: RapportWhereInputSchema.optional(),
}).strict() ;

export const NourritureCreateArgsSchema: z.ZodType<Prisma.NourritureCreateArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  data: z.union([ NourritureCreateInputSchema,NourritureUncheckedCreateInputSchema ]),
}).strict() ;

export const NourritureUpsertArgsSchema: z.ZodType<Prisma.NourritureUpsertArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereUniqueInputSchema,
  create: z.union([ NourritureCreateInputSchema,NourritureUncheckedCreateInputSchema ]),
  update: z.union([ NourritureUpdateInputSchema,NourritureUncheckedUpdateInputSchema ]),
}).strict() ;

export const NourritureCreateManyArgsSchema: z.ZodType<Prisma.NourritureCreateManyArgs> = z.object({
  data: z.union([ NourritureCreateManyInputSchema,NourritureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NourritureCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NourritureCreateManyAndReturnArgs> = z.object({
  data: z.union([ NourritureCreateManyInputSchema,NourritureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NourritureDeleteArgsSchema: z.ZodType<Prisma.NourritureDeleteArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  where: NourritureWhereUniqueInputSchema,
}).strict() ;

export const NourritureUpdateArgsSchema: z.ZodType<Prisma.NourritureUpdateArgs> = z.object({
  select: NourritureSelectSchema.optional(),
  include: NourritureIncludeSchema.optional(),
  data: z.union([ NourritureUpdateInputSchema,NourritureUncheckedUpdateInputSchema ]),
  where: NourritureWhereUniqueInputSchema,
}).strict() ;

export const NourritureUpdateManyArgsSchema: z.ZodType<Prisma.NourritureUpdateManyArgs> = z.object({
  data: z.union([ NourritureUpdateManyMutationInputSchema,NourritureUncheckedUpdateManyInputSchema ]),
  where: NourritureWhereInputSchema.optional(),
}).strict() ;

export const NourritureDeleteManyArgsSchema: z.ZodType<Prisma.NourritureDeleteManyArgs> = z.object({
  where: NourritureWhereInputSchema.optional(),
}).strict() ;

export const AvisCreateArgsSchema: z.ZodType<Prisma.AvisCreateArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  data: z.union([ AvisCreateInputSchema,AvisUncheckedCreateInputSchema ]),
}).strict() ;

export const AvisUpsertArgsSchema: z.ZodType<Prisma.AvisUpsertArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereUniqueInputSchema,
  create: z.union([ AvisCreateInputSchema,AvisUncheckedCreateInputSchema ]),
  update: z.union([ AvisUpdateInputSchema,AvisUncheckedUpdateInputSchema ]),
}).strict() ;

export const AvisCreateManyArgsSchema: z.ZodType<Prisma.AvisCreateManyArgs> = z.object({
  data: z.union([ AvisCreateManyInputSchema,AvisCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AvisCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AvisCreateManyAndReturnArgs> = z.object({
  data: z.union([ AvisCreateManyInputSchema,AvisCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AvisDeleteArgsSchema: z.ZodType<Prisma.AvisDeleteArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  where: AvisWhereUniqueInputSchema,
}).strict() ;

export const AvisUpdateArgsSchema: z.ZodType<Prisma.AvisUpdateArgs> = z.object({
  select: AvisSelectSchema.optional(),
  include: AvisIncludeSchema.optional(),
  data: z.union([ AvisUpdateInputSchema,AvisUncheckedUpdateInputSchema ]),
  where: AvisWhereUniqueInputSchema,
}).strict() ;

export const AvisUpdateManyArgsSchema: z.ZodType<Prisma.AvisUpdateManyArgs> = z.object({
  data: z.union([ AvisUpdateManyMutationInputSchema,AvisUncheckedUpdateManyInputSchema ]),
  where: AvisWhereInputSchema.optional(),
}).strict() ;

export const AvisDeleteManyArgsSchema: z.ZodType<Prisma.AvisDeleteManyArgs> = z.object({
  where: AvisWhereInputSchema.optional(),
}).strict() ;