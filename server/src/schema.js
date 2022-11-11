const { gql } = require("apollo-server");

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
   KPI:KPI @relationship(type: "HAS_GOAL", direction: IN)
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
   target: Target @relationship(type:"HAS_GOAL", direction:OUT)
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
   parentIndustries:[Industry!]! @relationship(type:"PARENT_INDUSTRY", direction:OUT)
   childIndustries:[Industry!]! @relationship(type:"CHILD_INDUSTRY", direction:IN)
}


type Domain {
   id:ID!  @id(autogenerate: true unique:true)
   code:String
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   parentDomains:[Domain!]! @relationship(type:"PARENT_DOMAIN", direction:OUT)
   childDomains:[Domain!]! @relationship(type:"CHILD_DOMAIN", direction:IN)
}

enum OfferingType {
 integration
 module
 product
 suite
}

type Offering {
   id:ID!  @unique
   code:String
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   offeringtype: OfferingType
   parentOfferings:[Offering!]! @relationship(type:"PARENT_OFFERING", direction:OUT)
   childOfferings:[Offering!]! @relationship(type:"CHILD_OFFERING", direction:IN)
   features:[Feature!]! @relationship(type:"PROVIDES", direction:OUT)
   #provider: Company  @relationship(type:"PROVIDES", direction:IN)
   objectives: [Objective!]! @relationship(type:"SATISFIES", direction:OUT)
   #capabilites:[Capability] @relationship(type:"")
}

type Capability {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   parentCapabilities:[Capability!]! @relationship(type:"PARENT_CAPABILITY", direction:OUT)
   childCapabilities:[Capability!]! @relationship(type:"CHILD_CAPABILITY", direction:IN)
   domains: [Domain!]! @relationship(type:"SUPPORTS", direction:OUT)
}

type Feature {
   id:ID! @id(autogenerate: true unique:true)
   name:String
   description:String
   updatedOn:String
   updatedBy:User
   satisfies: Requirement @relationship(type:"SATISFIES", direction:OUT)
   metrics:[Metric!]! @relationship(type:"MEASURED_BY", direction:OUT)
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
   parentRequirements:[Requirement!]! @relationship(type:"PARENT_REQUIREMENT", direction:OUT)
   childRequirements:[Requirement!]! @relationship(type:"CHILD_REQUIREMENT", direction:IN)
}`

module.exports = { typeDefs };