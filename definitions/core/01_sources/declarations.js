  /*
  This file is part of "GMP Clearview" package.
  Copyright (C)  2025 Infotrust 
  Alina Zilbergerts, Trish Dothkar,
  -- */


declare({
    database: dataform.projectConfig.defaultProject,
    schema: dataform.projectConfig.vars.GA4_DATASET,
    name: 'events_*'
});
declare({
    database: dataform.projectConfig.defaultProject,
    schema: dataform.projectConfig.vars.GA4_DATASET,
    tags: ["prod"],
    name: 'events_intraday_*'
});
declare({
    database: dataform.projectConfig.defaultProject,
    schema: dataform.projectConfig.vars.GA4_DATASET,
    tags: ["prod"],
    name: 'events_fresh_*'
});
