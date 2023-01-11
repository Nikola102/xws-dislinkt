package dislinkt.jobertyservice.Repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import dislinkt.jobertyservice.Model.GraphJobOffer;

public interface JobOfferGraphRepo extends Neo4jRepository<GraphJobOffer, String>{
    
}
