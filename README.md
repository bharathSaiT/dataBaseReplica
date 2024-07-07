# dataBaseReplicaJS
 A JavaScript Database Replicating Internal implementations of DataBase

 **Project Title:**

* **JS-Replica: A JavaScript Database Replica for Learning Internal Functioning of DataBase** 

**Description:**

**JS-Replica** is a personal project designed to explore and understand the core concepts of database management systems (DBMS) through a lightweight JavaScript implementation. This replica focuses on replicating key database functionalities such as:

* **Data Modeling:** Define and structure data using a schema approach.
* **Data Manipulation:** CRUD (Create, Read, Update, Delete) operations to manage data within the replica.
* **Transactions:** Implement rudimentary transaction handling to ensure data consistency across changes. 
    * **Note:** Due to the limitations of JavaScript in enforcing ACID properties in a fully distributed setting, this project might focus on emulating transactions for educational purposes. 
* **ACID Properites Compliant:** 
    * **ATMOICITY**  is ensusred by implmenting the ability of doing transactions, which either takes place wholly or not at all
    * **ISOLATION**  is ensured by utilising a global locking mechanism 
    * **CONSISTENCY**  is maintained by ensuring that any transaction will bring the database from one valid state to another
    * **DURABILITY**  is enhanced by writing data to both memory and persistent storage.
* **Security:** Explore basic security considerations like user authentication and access control mechanisms (potential areas for exploration: password hashing, role-based access control).
* **Ordering and Indexing:** Implement basic in-memory indexing techniques to improve query performance.
* **Error Handling:** Handle potential errors gracefully to enhance robustness.


**Learning Objectives:**

This project serves as a practical learning tool to:

* Gain hands-on experience with core database concepts.
* Experiment with implementing database functionalities in JavaScript.
* Deepen your understanding of transactions, ACID properties, and their challenges in a JavaScript environment.
* Explore security considerations for database interactions.
* Investigate the role of indexing in query performance.

**Target Audience:**

This project is ideal for:

* Beginner to intermediate developers interested in:
    * Understanding database fundamentals.
    * Experimenting with JavaScript in a database context (with appropriate caveats about limitations).
    * Exploring the challenges of implementing complex database features in a non-traditional environment.

**Development Stack:**

* JavaScript ( will be implemented in more performant language like C++ /GoLang in some time)
* Potential additional libraries as needed (will be mentioning any specific libraries we use)

**Project Status:**

* **Work in Progress (WIP):** This project is under development.

**Contributions:**

* Contributions are welcome! Feel free to open issues or pull requests to collaborate on this learning journey. (Encourages community involvement)

