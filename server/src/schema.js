const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
  id:ID! @id(autogenerate: true unique:true)
  username:String @unique
}

type Target {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   KPI:KPI @relationship(type: "HAS-GOAL", direction: IN)
}

type Objective {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   KPIs:[KPI!]! @relationship(type:"DRIVES", direction:OUT)
   offerings: [Offering!]! @relationship(type:"DRIVES", direction:IN)
   themes: [Theme!]! @relationship(type:"DRIVES", direction:IN)
}

type KPI {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   target: Target @relationship(type:"HAS-GOAL", direction:OUT)
   metric: Metric @relationship(type: "MEASURES", direction:IN)
   objectives:[Objective!]! @relationship(type:"DRIVES", direction:IN)
}

type Metric {
   id:ID! @id(autogenerate: true unique:true)
   code: String 
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   KPI:KPI @relationship(type:"MEASURES", direction:OUT)
}

type Theme{
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   objectives: [Objective!]! @relationship(type:"DRIVES", direction:OUT)
   #epics: [Epic] @relationship(type:"INCLUDES", direction:OUT)
   #stories:[Story] @relationship(type:"INCLUDES", direction:OUT)
}

type Industry {
   id:ID! @unique
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   parentIndustries:[Industry!]! @relationship(type:"PARENT-INDUSTRY", direction:OUT)
   childIndustries:[Industry!]! @relationship(type:"CHILD-INDUSTRY", direction:IN)
}


type Domain {
   id:ID!  @id(autogenerate: true unique:true)
   code:String
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   parentDomains:[Domain!]! @relationship(type:"PARENT-DOMAIN", direction:OUT)
   childDomains:[Domain!]! @relationship(type:"CHILD-DOMAIN", direction:IN)
}

enum OfferingType {
 integration
 module
 product
 suite
}

type Offering {
   id:ID! @unique
   code:String
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   offeringtype: OfferingType
   parentOfferings:[Offering!]! @relationship(type:"PARENT-OFFERING", direction:OUT)
   childOfferings:[Offering!]! @relationship(type:"CHILD-OFFERING", direction:IN)
   features:[Feature!]! @relationship(type:"PROVIDES", direction:OUT)
   #provider: Industry  @relationship(type:"PROVIDES", direction:IN)
   objectives: [Objective!]! @relationship(type:"SATISFIES", direction:OUT)
   #capabilites:[Capability] @relationship(type:"")
}

type Capability {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   parentCapabilities:[Capability!]! @relationship(type:"PARENT-CAPABILITY", direction:OUT)
   childCapabilities:[Capability!]! @relationship(type:"CHILD-CAPABILITY", direction:IN)
   domains: [Domain!]! @relationship(type:"SUPPORTS", direction:OUT)
}

type Feature {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   satisfies: Requirement @relationship(type:"SATISFIES", direction:OUT)
   metrics:[Metric!]! @relationship(type:"MEASURED-BY", direction:OUT)
   objectives:[Objective!]! @relationship(type:"ENABLES", direction:OUT)
   demoLinkInternal:String
   demoLink:String
   providers:[Offering!]! @relationship(type:"PROVIDES", direction:IN)
   capabilites:[Capability!]! @relationship(type:"SUPPORT", direction:OUT)

}

type Requirement {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   parentRequirements:[Requirement!]! @relationship(type:"PARENT-REQUIREMENT", direction:OUT)
   childRequirements:[Requirement!]! @relationship(type:"CHILD-REQUIREMENT", direction:IN)
}`

module.exports = { typeDefs };