
using _424Homework.Data;
using _424Homework.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace _424Homework.Controllers
{
    public class HomeController : Controller
    {

        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=RandomDatabase;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        
        public void Delete(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Delete(id);
        }

        public IActionResult GetPersonForId(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            Person p = repo.GetPersonForId(id);
            return Json(p);
        }

        public void Edit(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Edit(p);
        }

    }

}
